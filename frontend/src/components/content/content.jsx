import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, GitCommit, Calendar,
  FileText, Code, AlertTriangle, X, Save,
  ArrowLeft, Folder, FileCode, Terminal
} from 'lucide-react';
import axios from 'axios';
import Navbar from "../navbar";

export default function Content() {
  // FIXED: Changed to look for 'id' to match your routing setup
  const { id: urlCommitId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get repo ID from query params (e.g. ?repo=123)
  const queryParams = new URLSearchParams(location.search);
  const repoId = queryParams.get('repo');

  const [contents, setContents] = useState([]);
  const [singleCommit, setSingleCommit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form States
  const [formData, setFormData] = useState({ commitId: '', message: '', files: '' });
  const [currentEditId, setCurrentEditId] = useState(null);

  const API_BASE = "https://backend-szu2.onrender.com/content";

  useEffect(() => {
    if (urlCommitId) {
      fetchSingleContent(urlCommitId);
    } else {
      fetchAllContent();
    }
  }, [urlCommitId]);

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/all`);
      setContents(res.data);
    } catch (err) {
      console.error("Error fetching contents:", err);
      setError("Failed to load content data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleContent = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/${id}`);
      setSingleCommit(res.data);
    } catch (err) {
      console.error("Error fetching single commit:", err);
      setError("Failed to load specific commit data. It might not exist.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const payload = {
        commitId: formData.commitId,
        message: formData.message,
        files: formData.files.split(',').map(f => f.trim()).filter(f => f)
      };
      await axios.post(`${API_BASE}/create`, payload);
      await fetchAllContent();
      setIsCreateModalOpen(false);
      setFormData({ commitId: '', message: '', files: '' });
    } catch (err) {
      alert("Failed to create content: " + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = async (id) => {
    try {
      setActionLoading(true);
      const res = await axios.get(`${API_BASE}/${id}`);
      const data = res.data;
      setFormData({
        commitId: data.commitId,
        message: data.message,
        files: data.files ? data.files.join(', ') : ''
      });
      setCurrentEditId(data.commitId);
      setIsEditModalOpen(true);
    } catch (err) {
      alert("Failed to fetch specific content details.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const payload = {
        message: formData.message,
        files: formData.files.split(',').map(f => f.trim()).filter(f => f)
      };
      await axios.put(`${API_BASE}/update/${currentEditId}`, payload);
      await fetchAllContent();
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Failed to update content.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete commit ${id}?`)) return;
    try {
      setActionLoading(true);
      await axios.delete(`${API_BASE}/delete/${id}`);
      await fetchAllContent();
    } catch (err) {
      alert("Failed to delete content.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- 1. LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 animate-pulse mt-4">
        <div className="h-8 w-48 bg-slate-200 rounded mb-8"></div>
        <div className="h-64 bg-slate-200 rounded-xl w-full mb-6"></div>
      </div>
    </div>
  );

  // --- 2. ERROR STATE ---
  if (error) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="inline-flex p-4 bg-red-50 text-red-600 rounded-full mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button onClick={() => navigate(repoId ? `/repo/${repoId}` : '/all/Admin2026')} className="text-indigo-600 font-medium hover:underline">
          &larr; Return to {repoId ? "Repository" : "Admin Dashboard"}
        </button>
      </div>
    </div>
  );

  // --- 3. SINGLE COMMIT VIEW (STRICT ISOLATION) ---
  // FIXED: If there is an ID in the URL, we ONLY show this view.
  if (urlCommitId) {
    if (!singleCommit) return null; // Prevent showing anything until loaded

    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
        <Navbar />

        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <Link
            to={repoId ? `/repo/${repoId}` : "/all/Admin2026"}
            className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to {repoId ? "Repository" : "All Commits"}
          </Link>

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100">
                <GitCommit size={14} /> {singleCommit.commitId}
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(singleCommit.date).toLocaleString()}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
              {singleCommit.message}
            </h1>
          </div>

          {/* Files Explorer UI */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <h2 className="text-white font-semibold flex items-center gap-2 text-sm">
                <Folder size={18} className="text-indigo-400" />
                Changed Files
              </h2>
              <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                {singleCommit.files?.length || 0} files
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {singleCommit.files && singleCommit.files.length > 0 ? (
                singleCommit.files.map((file, idx) => (
                  <div key={idx} className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                    <FileCode size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="font-mono text-sm text-slate-700">{file}</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-slate-500 flex flex-col items-center">
                  <Terminal size={32} className="text-slate-300 mb-3" />
                  <p className="text-sm">No files associated with this commit.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. ALL COMMITS LIST VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Manager</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all repository commits and files.</p>
          </div>
          <button
            onClick={() => {
              setFormData({ commitId: '', message: '', files: '' });
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> Add New Content
          </button>
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.length > 0 ? contents.map((item) => (
            <div key={item._id || item.commitId} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    <GitCommit size={14} /> {item.commitId.slice(0, 8)}...
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(item.commitId)} className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.commitId)} className="text-slate-400 hover:text-red-600 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{item.message}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                  <Calendar size={14} /> {new Date(item.date).toLocaleString()}
                </p>

                <div className="bg-slate-50 rounded-lg p-3 text-sm font-mono text-slate-600 mb-4">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Code size={14} /> Files ({item.files?.length || 0})
                  </div>
                  <ul className="space-y-1">
                    {item.files?.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 truncate">
                        <FileText size={12} className="text-emerald-500" /> {f}
                      </li>
                    ))}
                    {item.files?.length > 3 && (
                      <li className="text-xs text-slate-400 italic mt-1">+{item.files.length - 3} more files</li>
                    )}
                  </ul>
                </div>

                <Link
                  to={`/content/${item.commitId}`}
                  className="block w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  View Details
                </Link>

              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
              <Code size={40} className="mx-auto opacity-20 mb-4" />
              <p>No content records found in the database.</p>
            </div>
          )}
        </div>

        {/* --- MODALS --- */}
        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {isEditModalOpen ? <Edit2 className="text-indigo-600" /> : <Plus className="text-indigo-600" />}
                  {isEditModalOpen ? "Edit Content" : "Create New Content"}
                </h2>
                <button
                  onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={isEditModalOpen ? handleUpdate : handleCreate} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Commit ID</label>
                  <input
                    type="text"
                    required
                    disabled={isEditModalOpen}
                    value={formData.commitId}
                    onChange={(e) => setFormData({ ...formData, commitId: e.target.value })}
                    placeholder="e.g., a1b2c3d4"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Commit Message</label>
                  <input
                    type="text"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g., Initial commit"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Files (Comma separated)</label>
                  <textarea
                    rows={3}
                    value={formData.files}
                    onChange={(e) => setFormData({ ...formData, files: e.target.value })}
                    placeholder="index.js, package.json, src/App.jsx"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-transparent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
                  >
                    <Save size={16} /> {actionLoading ? 'Saving...' : 'Save Content'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}