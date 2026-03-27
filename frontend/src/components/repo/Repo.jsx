import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Folder, Clock, Shield, Globe, Lock, 
  Trash2, Edit2, Eye, EyeOff, Check, X, Code, Terminal, AlertTriangle
} from 'lucide-react';
import axios from 'axios';
import Navbar from "../navbar";

export default function Repo() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '' });

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3002/repo/${id}`);
        
        if (res.data && res.data.length > 0) {
          const repoData = res.data[0];
          setRepo(repoData);
          setEditData({ name: repoData.name, description: repoData.description });
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

    if (id) fetchRepoDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setActionLoading(true);
      await axios.put(`http://localhost:3002/repo/update/${id}`, editData);
      setRepo(prev => ({ ...prev, name: editData.name, description: editData.description }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating repo:", err);
      alert("Failed to update repository.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      setActionLoading(true);
      await axios.patch(`http://localhost:3002/repo/toggle/${id}`);
      setRepo(prev => ({ ...prev, visibility: !prev.visibility }));
    } catch (err) {
      console.error("Error toggling visibility:", err);
      alert("Failed to change visibility.");
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteInput !== repo.name) return;
    
    try {
      setActionLoading(true);
      await axios.delete(`http://localhost:3002/repo/delete/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error deleting repo:", err);
      alert("Failed to delete repository.");
      setActionLoading(false);
      setShowDeleteModal(false);
    }
  };

  // --- Standardized Skeleton Loader ---
  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-pulse mt-4">
        <div className="h-4 w-28 bg-slate-200 rounded mb-8"></div>
        <div className="flex gap-5 mb-8">
          <div className="w-14 h-14 bg-slate-200 rounded-xl"></div>
          <div className="space-y-3 flex-1 pt-1">
            <div className="h-7 w-1/4 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="h-80 bg-slate-200 rounded-xl w-full"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-3 shadow-sm text-base">
        <AlertTriangle size={18} />
        <span className="font-medium">{error}</span>
      </div>
      <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
        &larr; Return to Dashboard
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold text-slate-900">Delete Repository</h3>
            </div>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              This action cannot be undone. This will permanently delete the 
              <span className="font-semibold text-slate-900"> {repo.name} </span> repository, files, and history.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Please type <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-red-600 select-all">{repo.name}</span> to confirm.
              </label>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-base focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow font-mono"
                placeholder={repo.name}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteInput("");
                }}
                disabled={actionLoading}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteInput !== repo.name || actionLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {actionLoading ? 'Deleting...' : 'Delete repository'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container - Standardized max-width (6xl) and padding */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-semibold uppercase tracking-wider mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </Link>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-5 w-full">
            <div className="p-3.5 bg-white text-slate-800 rounded-xl shadow-sm ring-1 ring-slate-900/5 flex-shrink-0">
              <Folder size={28} strokeWidth={1.5} />
            </div>
            
            <div className="flex-1 pt-1">
              {isEditing ? (
                <div className="max-w-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full text-3xl font-semibold tracking-tight text-slate-900 bg-transparent border-b-2 border-slate-200 focus:outline-none focus:border-indigo-500 pb-1.5 transition-colors placeholder:text-slate-300"
                    placeholder="Repository Name"
                    autoFocus
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full text-slate-600 text-base mt-2 bg-white border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none shadow-sm transition-all"
                    placeholder="Add a short description..."
                    rows={2}
                  />
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleUpdate} 
                      disabled={actionLoading}
                      className="flex items-center gap-2 text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-md hover:bg-slate-800 hover:shadow-sm transition-all disabled:opacity-50"
                    >
                      <Check size={16} /> {actionLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({ name: repo.name, description: repo.description });
                      }} 
                      className="flex items-center gap-2 text-sm font-medium bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{repo?.name}</h1>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                      repo?.visibility 
                        ? 'border-emerald-200 text-emerald-700 bg-emerald-50' 
                        : 'border-slate-200 text-slate-600 bg-white shadow-sm'
                    }`}>
                      {repo?.visibility ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-base mt-2 max-w-2xl leading-relaxed">
                    {repo?.description || "No description provided."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid - Standardized gap (8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main File/Code Area */}
          <div className="lg:col-span-8">
            <div className="bg-[#0d1117] rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 flex flex-col h-full">
              
              <div className="bg-[#161b22] p-3.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Terminal size={16} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded">main / root</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium uppercase tracking-wider">
                  <Clock size={14} /> Updated recently
                </div>
              </div>

              {/* Standardized min-height */}
              <div className="p-5 font-mono text-sm leading-relaxed min-h-[350px] overflow-x-auto text-slate-300">
                {repo?.content && repo.content.length > 0 ? (
                  <div className="space-y-0.5">
                    {repo.content.map((line, index) => (
                      <div key={index} className="flex group hover:bg-white/5 px-2 py-0.5 rounded transition-colors">
                        <span className="text-slate-600 w-8 select-none shrink-0 text-right pr-3 text-xs">{index + 1}</span>
                        <span className="text-emerald-400 whitespace-pre-wrap">{line}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 mt-12">
                    <div className="p-4 bg-white/5 rounded-full">
                      <Code size={28} className="opacity-50" />
                    </div>
                    <span className="text-sm tracking-wide">Repository is empty.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-5">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                About
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-md">
                      <Shield size={16} />
                    </div>
                    <span className="font-medium text-sm">Owner</span>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{repo?.owner?.username || "Fetching..."}</span>
                </div>
                
                <div className="w-full h-px bg-slate-50"></div>

                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${repo?.visibility ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-500'}`}>
                      {repo?.visibility ? <Globe size={16} /> : <Lock size={16} />}
                    </div>
                    <span className="font-medium text-sm">Access</span>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{repo?.visibility ? 'Public' : 'Private'}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-5">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5">
                Actions
              </h3>
              <div className="space-y-2.5">
                <button 
                  onClick={() => setIsEditing(true)}
                  disabled={isEditing || actionLoading}
                  className="w-full flex items-center justify-between p-3 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all rounded-lg text-sm text-slate-700 font-medium group disabled:opacity-50"
                >
                  <span className="flex items-center gap-3">
                    <Edit2 size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" /> 
                    Edit Details
                  </span>
                </button>
                
                <button 
                  onClick={handleToggleVisibility}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-between p-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all rounded-lg text-sm text-slate-700 font-medium group disabled:opacity-50"
                >
                  <span className="flex items-center gap-3">
                    {repo?.visibility 
                      ? <EyeOff size={16} className="text-slate-400 group-hover:text-slate-600" /> 
                      : <Eye size={16} className="text-slate-400 group-hover:text-slate-600" />
                    } 
                    Make {repo?.visibility ? 'Private' : 'Public'}
                  </span>
                </button>

                <div className="pt-3.5 mt-3.5 border-t border-slate-100">
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-between p-3 border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all rounded-lg text-sm text-red-600 font-medium group disabled:opacity-50"
                  >
                    <span className="flex items-center gap-3">
                      <Trash2 size={16} className="text-red-400 group-hover:text-red-600 transition-colors" /> 
                      Delete Repository
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}