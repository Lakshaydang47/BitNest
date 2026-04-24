import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, Plus, Edit2, Trash2, CheckCircle2,
  Circle, AlertCircle, X, MessageSquare, AlertTriangle, Save
} from 'lucide-react';
import Navbar from '../navbar';

export default function Issue() {
  const { id: repoId } = useParams();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'open' });
  const [currentEditId, setCurrentEditId] = useState(null);

  const API_BASE = "https://backend-szu2.onrender.com/issue";

  useEffect(() => {
    if (repoId) {
      fetchIssues();
    } else {
      setLoading(false);
      setError("No repository specified. Please navigate to a repository to view its issues.");
    }
  }, [repoId]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/all/${repoId}`);
      setIssues(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch issues.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({ title: '', description: '', status: 'open' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (issue) => {
    setFormData({ title: issue.title, description: issue.description, status: issue.status });
    setCurrentEditId(issue._id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      if (isEditing) {
        await axios.put(`${API_BASE}/update/${currentEditId}`, formData);
      } else {
        await axios.post(`${API_BASE}/create/${repoId}`, formData);
      }
      setIsModalOpen(false);
      fetchIssues();
    } catch (err) {
      alert("An error occurred while saving the issue.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (issueId) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      setActionLoading(true);
      await axios.delete(`${API_BASE}/delete/${issueId}`);
      fetchIssues();
    } catch (err) {
      alert("Failed to delete issue.");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleStatus = async (issue) => {
    const newStatus = issue.status === 'open' ? 'closed' : 'open';
    try {
      setActionLoading(true);
      await axios.put(`${API_BASE}/update/${issue._id}`, { ...issue, status: newStatus });
      fetchIssues();
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 animate-pulse mt-4">
        <div className="h-8 w-48 bg-slate-200 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-24 bg-slate-200 rounded-xl w-full"></div>
          <div className="h-24 bg-slate-200 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link to={repoId ? `/repo/${repoId}` : '/dashboard'} className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to {repoId ? 'Repository' : 'Dashboard'}
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <MessageSquare className="text-indigo-600" size={32} />
              Issue Tracker
            </h1>
            <p className="text-slate-500 mt-2">Manage open tasks, bugs, and feature requests.</p>
          </div>

          {repoId && (
            <button
              onClick={openCreateModal}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Plus size={18} /> New Issue
            </button>
          )}
        </div>

        {error ? (
          <div className="p-6 bg-red-50 rounded-xl border border-red-100 text-center flex flex-col items-center">
            <AlertTriangle className="text-red-500 mb-2" size={32} />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-1.5 cursor-pointer">
                  <AlertCircle size={16} className="text-emerald-600" />
                  {issues.filter(i => i.status === 'open').length} Open
                </span>
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                  <CheckCircle2 size={16} className="text-indigo-600" />
                  {issues.filter(i => i.status === 'closed').length} Closed
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {issues.length === 0 ? (
                <div className="px-6 py-16 text-center text-slate-500">
                  <Circle size={40} className="mx-auto opacity-20 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">No issues here</h3>
                  <p className="text-sm">Create an issue to start tracking bugs or tasks.</p>
                </div>
              ) : (
                issues.map(issue => (
                  <div key={issue._id} className="p-6 flex gap-4 hover:bg-slate-50 transition-colors group">
                    <button
                      onClick={() => toggleStatus(issue)}
                      className={`mt-1 flex-shrink-0 transition-colors ${issue.status === 'open' ? 'text-emerald-500 hover:text-emerald-600' : 'text-indigo-500 hover:text-indigo-600'}`}
                      title={`Mark as ${issue.status === 'open' ? 'closed' : 'open'}`}
                    >
                      {issue.status === 'open' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    </button>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-lg font-bold mb-1 ${issue.status === 'closed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                          {issue.title}
                        </h3>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditModal(issue)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded bg-white shadow-sm border border-slate-200">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDelete(issue._id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded bg-white shadow-sm border border-slate-200">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm whitespace-pre-wrap mt-1">{issue.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 text-slate-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {isEditing ? <Edit2 className="text-indigo-600" size={20} /> : <Plus className="text-indigo-600" size={20} />}
                  {isEditing ? 'Edit Issue' : 'New Issue'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Fix login page crashing"
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the issue in detail..."
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm resize-y"
                  />
                </div>

                {isEditing && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white shadow-sm"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70 shadow-sm hover:shadow"
                  >
                    <Save size={16} />
                    {actionLoading ? 'Saving...' : 'Save Issue'}
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
