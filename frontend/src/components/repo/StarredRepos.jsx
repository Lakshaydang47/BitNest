import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, FolderTree, Clock, ChevronRight,
  Search, ArrowLeft, Globe, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../navbar';

export default function StarredRepos() {
  const [starredRepos, setStarredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://backend-szu2.onrender.com/starred/${userId}`);
        setStarredRepos(res.data.starredRepositories || []);
      } catch (err) {
        console.error("Error fetching starred repos:", err);
        setError("Failed to load your starred repositories.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchStarred();
  }, [userId]);

  const filteredRepos = starredRepos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 animate-pulse mt-4">
        <div className="h-8 w-64 bg-slate-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Star size={24} fill="currentColor" className="text-amber-500" />
              </div>
              Starred Repositories
            </h1>
            <p className="text-slate-500 mt-1">Repositories you've bookmarked for quick access.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search starred projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-center gap-4 text-red-700">
            <AlertCircle size={24} />
            <p className="font-medium">{error}</p>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <Link
                key={repo._id}
                to={`/repo/${repo._id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl transition-colors">
                    <FolderTree size={20} />
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${repo.visibility ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {repo.visibility ? 'Public' : 'Private'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors truncate">
                  {repo.name}
                </h3>

                <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">
                  {repo.description || `A community project by ${repo.owner?.username || "an unknown developer"}.`}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Star size={12} fill="currentColor" className="text-amber-500" />
                      {repo.stars || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      Updated
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No starred repositories</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              {searchQuery
                ? `No results matching "${searchQuery}" in your stars.`
                : "You haven't starred any repositories yet. Start exploring the community to find projects you like!"}
            </p>
            {!searchQuery && (
              <Link to="/dashboard" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors">
                <Globe size={16} />
                Explore Community
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
