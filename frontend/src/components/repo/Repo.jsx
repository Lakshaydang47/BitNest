import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Folder, AlertTriangle,
  Trash2, Edit2, Eye, EyeOff, Search,
  MessageSquare, GitCommit, Calendar, Code, FileText,
  Star
} from 'lucide-react';
import axios from 'axios';
import Navbar from "../navbar";
import GitTerminal from "./GitTerminal";

export default function Repo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '' });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const [inputCommitId, setInputCommitId] = useState("");

  // Star state
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);

  const fetchRepoDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://backend-szu2.onrender.com/repo/${id}`);

      const repoData = Array.isArray(res.data) ? res.data[0] : res.data;

      if (repoData) {
        if (!repoData.content) repoData.content = [];
        if (!repoData.issues) repoData.issues = [];

        setRepo(repoData);
        setEditData({ name: repoData.name || '', description: repoData.description || '' });
        setStarCount(repoData.stars || 0);
      } else {
        setError("Repository not found.");
      }
    } catch (err) {
      console.error("Error fetching repo:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user has starred this repo
  const checkStarStatus = async () => {
    if (!currentUserId) return;
    try {
      const res = await axios.get(`https://backend-szu2.onrender.com/starred/${currentUserId}`);
      const starred = res.data.starRepos || [];
      setIsStarred(starred.some(rid => rid === id || rid.toString() === id));
    } catch (err) {
      // Silently fail
    }
  };

  useEffect(() => {
    if (id) {
      fetchRepoDetails();
      checkStarStatus();
    }
  }, [id]);

  const handleToggleStar = async () => {
    try {
      const res = await axios.post(`https://backend-szu2.onrender.com/star/${id}`, { userId: currentUserId });
      setIsStarred(res.data.starred);
      setStarCount(prev => res.data.starred ? prev + 1 : Math.max(0, prev - 1));
    } catch (err) {
      alert("Failed to toggle star.");
    }
  };

  const handleUpdate = async () => {
    try {
      setActionLoading(true);
      await axios.put(`https://backend-szu2.onrender.com/repo/update/${id}`, editData);
      setRepo(prev => ({ ...prev, name: editData.name, description: editData.description }));
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update repository.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      setActionLoading(true);
      await axios.patch(`https://backend-szu2.onrender.com/repo/toggle/${id}`);
      setRepo(prev => ({ ...prev, visibility: !prev.visibility }));
    } catch (err) {
      alert("Failed to change visibility.");
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteInput !== repo?.name) return;
    try {
      setActionLoading(true);
      await axios.delete(`https://backend-szu2.onrender.com/repo/delete/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert("Failed to delete repository.");
      setActionLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleViewSpecificCommit = () => {
    if (inputCommitId.trim()) {
      navigate(`/content/${inputCommitId.trim()}?repo=${id}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 animate-pulse mt-4">
        <div className="h-4 w-28 bg-slate-200 rounded mb-8"></div>
        <div className="h-40 bg-slate-200 rounded-xl w-full mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-80 bg-slate-200 rounded-xl"></div>
          <div className="lg:col-span-4 h-64 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-3 shadow-sm">
        <AlertTriangle size={18} />
        <span className="font-medium">{error}</span>
      </div>
      <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
        &larr; Return to Dashboard
      </Link>
    </div>
  );

  const isOwner = repo?.owner?._id === currentUserId || repo?.owner === currentUserId;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-600" size={20} /> Delete Repository
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Permanently delete <span className="font-semibold text-slate-900"> {repo?.name} </span>?
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-base focus:border-red-500 font-mono"
              placeholder={`Type ${repo?.name} to confirm`}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm text-slate-600">Cancel</button>
              <button onClick={confirmDelete} disabled={deleteInput !== repo?.name || actionLoading} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg disabled:opacity-50">
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Repository Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-5 w-full">
            <div className={`p-4 rounded-xl shadow-sm ring-1 ring-slate-900/5 flex-shrink-0 ${repo?.visibility ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
              <Folder size={32} strokeWidth={1.5} />
            </div>

            <div className="flex-1 pt-1">
              {isEditing ? (
                <div className="max-w-2xl space-y-3">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full text-3xl font-semibold border-b-2 border-indigo-500 focus:outline-none bg-transparent"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full text-slate-600 border p-3 rounded-lg focus:ring-1 focus:ring-indigo-500"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button onClick={handleUpdate} className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-800 transition-colors">Save</button>
                    <button onClick={() => setIsEditing(false)} className="border px-5 py-2 rounded-md hover:bg-slate-50 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <h1 className="text-3xl font-bold text-slate-900">{repo?.name || "Unnamed Repo"}</h1>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${repo?.visibility ? 'border border-indigo-200 text-indigo-700 bg-indigo-50' : 'border border-slate-200 text-slate-600 bg-white'}`}>
                      {repo?.visibility ? 'Public' : 'Private'}
                    </span>

                    {/* Star Button */}
                    <button
                      onClick={handleToggleStar}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${isStarred
                          ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    >
                      <Star
                        size={16}
                        fill={isStarred ? "currentColor" : "none"}
                        className={isStarred ? "text-amber-400" : ""}
                      />
                      {isStarred ? 'Starred' : 'Star'}
                      <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded ${isStarred ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {starCount}
                      </span>
                    </button>
                  </div>
                  <p className="text-slate-500 text-base mt-2 max-w-2xl">{repo?.description || "No description provided."}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Git Terminal */}
            <GitTerminal repoId={id} />

            {/* Search Commits Block */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full hover:shadow transition-shadow">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Search size={18} className="text-indigo-500" />
                Search specific commit
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputCommitId}
                  onChange={(e) => setInputCommitId(e.target.value)}
                  placeholder="Enter commit ID (e.g. a1b2c3d4)..."
                  className="flex-1 border border-slate-300 rounded-lg p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-mono transition-all outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleViewSpecificCommit()}
                />
                <button
                  onClick={handleViewSpecificCommit}
                  disabled={!inputCommitId.trim()}
                  className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  View
                </button>
              </div>
            </div>

            {/* Commits List Block */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <GitCommit size={18} className="text-indigo-600" />
                  Recent Commits
                </h2>
                <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                  {repo?.content?.length || 0} commits
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {repo?.content && repo.content.length > 0 ? (
                  repo.content.slice().reverse().slice(0, 10).map((commit) => (
                    <div key={commit._id || commit.commitId} className="p-5 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 text-base">{commit.message}</h3>
                        <Link
                          to={`/content/${commit.commitId}?repo=${id}`}
                          className="text-xs font-mono bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-1 rounded transition-colors shrink-0 ml-3"
                        >
                          {commit.commitId?.substring(0, 8) || "—"}
                        </Link>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><Calendar size={13} /> {commit.date ? new Date(commit.date).toLocaleDateString() : "—"}</span>
                        <span className="flex items-center gap-1"><FileText size={13} /> {commit.files?.length || 0} files changed</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center flex flex-col items-center justify-center text-slate-500">
                    <Code size={40} className="opacity-20 mb-3" />
                    <p className="font-medium">No commits yet.</p>
                    <p className="text-sm mt-1">Use the terminal above to init, add files, and commit.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Issues Block */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare size={18} className="text-emerald-500" />
                  Issues
                </h3>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {repo?.issues?.length || 0}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-5">
                Track tasks, bugs, and feature requests for this repository.
              </p>
              <Link
                to={`/issue/${id}`}
                className="block w-full text-center py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-sm rounded-lg transition-colors border border-emerald-200"
              >
                Go to Issue Tracker
              </Link>
            </section>

            {/* Actions Block */}
            {isOwner && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Repository Actions</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={isEditing}
                    className="w-full flex items-center gap-3 p-3 border border-slate-200 hover:bg-slate-50 transition-all rounded-lg text-sm text-slate-700 font-medium"
                  >
                    <Edit2 size={16} className="text-indigo-500" /> Edit Details
                  </button>

                  <button
                    onClick={handleToggleVisibility}
                    className="w-full flex items-center gap-3 p-3 border border-slate-200 hover:bg-slate-50 transition-all rounded-lg text-sm text-slate-700 font-medium"
                  >
                    {repo?.visibility ? <EyeOff size={16} className="text-slate-500" /> : <Eye size={16} className="text-slate-500" />}
                    Make {repo?.visibility ? 'Private' : 'Public'}
                  </button>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center gap-3 p-3 border border-red-100 hover:bg-red-50 text-red-600 transition-all rounded-lg text-sm font-medium"
                    >
                      <Trash2 size={16} /> Delete Repository
                    </button>
                  </div>
                </div>
              </section>
            )}

          </aside>

        </div>
      </div>
    </div>
  );
}