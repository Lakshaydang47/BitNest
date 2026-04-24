import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, FolderPlus, Globe, Lock,
  Check, ShieldAlert, Hash
} from 'lucide-react';
import axios from 'axios';
import Navbar from "../navbar";

export default function CreateRepo() {
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Basic frontend validation
    if (!name.trim()) {
      setError("Repository name is required.");
      return;
    }

    // Grab ID from local storage
    const currentUserId = localStorage.getItem("userId");

    // 2. STRICT VALIDATION: Catch null, empty, AND the literal string "undefined"
    if (!currentUserId || currentUserId === "undefined" || currentUserId === "null") {
      setError("User ID missing. Please log out and log back in to create a repository.");
      return;
    }

    try {
      setLoading(true);

      // Note: If you have an array of commits in your Mongoose schema (e.g., content: [{ type: ObjectId }]),
      // make sure your backend is handling this 'initialCommitId' string correctly!
      const payload = {
        name: name.trim(),
        description: description.trim(),
        visibility: isPublic,
        owner: currentUserId,
        initialCommitId: content.trim(),
        issues: []
      };

      // 3. Send to backend
      const res = await axios.post("https://backend-szu2.onrender.com/repo/create", payload);

      // 4. Redirect to the newly created repository page
      if (res.status === 201) {
        navigate(`/repo/${res.data.repositoryID || res.data._id}`); // Fallback to _id just in case
      }
    } catch (err) {
      console.error("Creation error:", err);
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to create repository. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-semibold uppercase tracking-wider mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">

          {/* Header */}
          <div className="bg-slate-900 px-8 py-10 text-white flex items-center gap-5">
            <div className="p-3 bg-white/10 rounded-xl text-indigo-300">
              <FolderPlus size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create a new repository</h1>
              <p className="text-slate-400 text-sm mt-1">
                A repository contains all project files, including the revision history.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCreate} className="p-8 space-y-8">

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start gap-3 text-sm animate-in fade-in duration-200">
                <ShieldAlert size={18} className="mt-0.5 shrink-0" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label htmlFor="repo-name" className="block text-sm font-semibold text-slate-900 mb-2">
                Repository Name <span className="text-red-500">*</span>
              </label>
              <input
                id="repo-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., awesome-react-project"
                className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow font-mono text-sm placeholder:font-sans placeholder:text-slate-400"
                autoFocus
                required
              />
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Description Input */}
            <div>
              <label htmlFor="repo-description" className="block text-sm font-semibold text-slate-900 mb-2">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="repo-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this repository for?"
                rows={2}
                className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow text-sm resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Commit ID (Content) Input */}
            <div>
              <label htmlFor="repo-content" className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Hash size={16} className="text-slate-400" />
                Initial Commit ID <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="repo-content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g., 8f2a1b3c..."
                className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow font-mono text-sm placeholder:font-sans placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-500 mt-2">
                Provide a commit hash string to initialize the repository content.
              </p>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Visibility Toggles */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4">
                Visibility
              </label>
              <div className="space-y-3">

                {/* Public Option */}
                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isPublic ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <div className="pt-0.5">
                    <input
                      type="radio"
                      name="visibility"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={24} className={isPublic ? 'text-indigo-600' : 'text-slate-400'} strokeWidth={1.5} />
                    <div>
                      <h4 className={`text-sm font-semibold ${isPublic ? 'text-indigo-900' : 'text-slate-700'}`}>Public</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Anyone on the internet can see this repository.</p>
                    </div>
                  </div>
                </label>

                {/* Private Option */}
                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${!isPublic ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <div className="pt-0.5">
                    <input
                      type="radio"
                      name="visibility"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock size={24} className={!isPublic ? 'text-indigo-600' : 'text-slate-400'} strokeWidth={1.5} />
                    <div>
                      <h4 className={`text-sm font-semibold ${!isPublic ? 'text-indigo-900' : 'text-slate-700'}`}>Private</h4>
                      <p className="text-xs text-slate-500 mt-0.5">You choose who can see this repository.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {loading ? 'Creating...' : <><Check size={16} /> Create Repository</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}