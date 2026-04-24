import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderTree, Search, Calendar, Star, Globe,
  ChevronRight, Plus, Zap, Newspaper, ArrowUpRight, Clock,
  User, Info, X, ExternalLink, Heart
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../navbar";
import "./dashboard.css";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userStarredRepos, setUserStarredRepos] = useState([]);
  const [activeNews, setActiveNews] = useState(0);

  const newsItems = [
    "Bitnest v2.4 rollout scheduled for Friday.",
    "Global: 1.2M commits processed this hour.",
    "New security patch for Node.js repositories.",
    "Community: 50+ new projects joined Bitnest today."
  ];

  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const [starLoading, setStarLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const openPreview = async (repo) => {
    setSelectedRepo(repo);
    setIsPreviewOpen(true);

    // Check star status
    try {
      const res = await axios.get(`https://backend-szu2.onrender.com/starred/${userId}`);
      setIsStarred(res.data.starRepos.some(id => id.toString() == repo._id.toString()));

      // Check follow status of owner
      const ownerId = repo.owner?._id || repo.owner;
      const userRes = await axios.get(`https://backend-szu2.onrender.com/userProfile/${userId}`);
      setIsFollowing(userRes.data.followedUsers?.some(id => id.toString() == ownerId.toString()));
    } catch (e) {
      console.error("Error checking socio status:", e);
    }
  };

  const handleFollow = async () => {
    if (!selectedRepo?.owner) return;
    const targetId = selectedRepo.owner._id || selectedRepo.owner;
    try {
      setFollowingLoading(true);
      const endpoint = isFollowing ? "unfollow" : "follow";
      await axios.post(`https://backend-szu2.onrender.com/${endpoint}`, { userId, targetId });
      setIsFollowing(!isFollowing);
    } catch (e) {
      alert("Failed to update follow status.");
    } finally {
      setFollowingLoading(false);
    }
  };

  const toggleStar = async (repo, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await axios.post(`https://backend-szu2.onrender.com/star/${repo._id}`, { userId });

      // Update local starred repos list
      if (res.data.starred) {
        setUserStarredRepos(prev => [...prev, repo._id.toString()]);
      } else {
        setUserStarredRepos(prev => prev.filter(id => id !== repo._id.toString()));
      }

      // If the drawer is open for THIS repo, update the drawer state
      if (selectedRepo && selectedRepo._id === repo._id) {
        setIsStarred(res.data.starred);
      }
      // Re-fetch community repos to reflect star counts
      const resAll = await axios.get(`https://backend-szu2.onrender.com/repo/all`);
      setSuggestedRepositories((resAll.data || []).filter(r => r.visibility === true));
    } catch (e) {
      alert("Failed to update star.");
    }
  };

  const handleStarInPreview = async () => {
    if (!selectedRepo) return;
    setStarLoading(true);
    await toggleStar(selectedRepo);
    setStarLoading(false);
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        // 1. Fetch personal repos (Includes both Private and Public)
        const userReposRes = await axios.get(`https://backend-szu2.onrender.com/repo/user/${userId}`);
        setRepositories(userReposRes.data.repositories || []);

        // 2. Fetch all community repos
        const allReposRes = await axios.get(`https://backend-szu2.onrender.com/repo/all`);

        // 3. FILTER: Only keep repositories that are marked as Public
        // (Assuming your schema uses a boolean: true = public, false = private)
        const publicCommunityRepos = (allReposRes.data || []).filter(
          (repo) => repo.visibility === true
        );

        setSuggestedRepositories(publicCommunityRepos);

        // 3. Fetch user's starred repos to color icons correctly
        const starredRes = await axios.get(`https://backend-szu2.onrender.com/starred/${userId}`);
        setUserStarredRepos((starredRes.data.starRepos || []).map(id => id.toString()));
      } catch (err) {
        console.error("Error fetching Dashboard data:", err);
      }
    };

    if (userId) fetchData();
  }, []);

  // Search Logic: Combines personal and public repos perfectly
  useEffect(() => {
    // repositories = Personal (Public + Private)
    // suggestedRepositories = Community (Public ONLY)
    const allAvailableRepos = [...repositories, ...suggestedRepositories];

    // Ensure unique IDs using a Map (removes duplicates if your own public repo is in both)
    const uniqueRepos = Array.from(
      new Map(allAvailableRepos.map((repo) => [repo._id, repo])).values()
    );

    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
    } else {
      const filtered = uniqueRepos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories, suggestedRepositories]);

  // News Ticker Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % newsItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [newsItems.length]);

  return (
    <div className="dashboard-root">
      <Navbar />

      <div className="dashboard-container">

        {/* SECTION 1: SIDEBAR EXPLORE */}
        <aside className="section-sidebar">
          <div className="section-header">
            <Globe size={14} className="icon-muted" />
            <span>Explore Community</span>
          </div>
          <div className="suggested-list">
            {suggestedRepositories.slice(0, 6).map((repo) => (
              <div
                key={repo._id}
                onClick={() => openPreview(repo)}
                className="suggested-item cursor-pointer group"
              >
                <div className="dot"></div>
                <div className="details flex-1">
                  <p className="name group-hover:text-indigo-600 transition-colors">{repo.name}</p>
                  <p className="meta">{repo.owner?.username || "Community"} • Bitnest</p>
                </div>
                <div
                  className={`p-1.5 rounded-md hover:bg-slate-100 transition-all ${userStarredRepos.includes(repo._id.toString())
                      ? 'text-amber-500 bg-amber-50'
                      : 'text-slate-400 hover:text-amber-500'
                    }`}
                  onClick={(e) => toggleStar(repo, e)}
                >
                  <Star
                    size={14}
                    fill={userStarredRepos.includes(repo._id.toString()) ? "currentColor" : "none"}
                    className={userStarredRepos.includes(repo._id.toString()) ? "text-amber-500" : ""}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* SECTION 2: MAIN WORKSPACE */}
        <main className="section-main">
          <div className="workspace-header">
            <div className="title-area">
              <h1>{searchQuery ? "Global Search" : "Your Projects"}</h1>
              <p>{searchResults.length} Repositories found</p>
            </div>
            <Link to="/repo/create" className="btn-primary">
              <Plus size={18} />
              <span>New Repo</span>
            </Link>
          </div>

          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search your repos or public projects..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="repo-grid">
            {searchResults.map((repo) => {
              const isMine = repositories.some((r) => r._id === repo._id);
              return (
                <Link
                  key={repo._id}
                  to={`/repo/${repo._id}`}
                  className="repo-card"
                >
                  <div className="card-header">
                    <FolderTree size={20} className={isMine ? "text-indigo" : "text-emerald"} />
                    <span className={`badge ${repo.visibility ? 'mine' : 'public'}`}>
                      {repo.visibility ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <h3 className="repo-title">{repo.name}</h3>
                  <p className="repo-desc">
                    {repo.description || "A professional version control project built on Bitnest."}
                  </p>
                  <div className="card-footer">
                    <Star
                      size={12}
                      fill={userStarredRepos.includes(repo._id.toString()) ? "currentColor" : "none"}
                      className={userStarredRepos.includes(repo._id.toString()) ? "text-amber-500" : ""}
                    />
                    <span>{repo.stars || 0} stars</span>
                    <Clock size={12} />
                    <span>Updated Recently</span>
                    <ChevronRight size={14} className="arrow" />
                  </div>
                </Link>
              );
            })}
          </div>
        </main>

        {/* SECTION 3: SYSTEM PULSE */}
        <aside className="section-activity">
          <div className="section-header">
            <Zap size={14} className="text-amber" />
            <span>System Pulse</span>
          </div>

          <div className="events-container">
            <div className="event-card indigo">
              <div className="event-content">
                <span className="event-tag">Conference</span>
                <h4>Tech Summit 2026</h4>
                <div className="event-footer">
                  <Calendar size={12} /> <span>Dec 15</span>
                </div>
              </div>
              <ArrowUpRight className="event-icon" size={16} />
            </div>

            <div className="event-card rose">
              <div className="event-content">
                <span className="event-tag">Community</span>
                <h4>Dev Meetup</h4>
                <div className="event-footer">
                  <Calendar size={12} /> <span>Dec 25</span>
                </div>
              </div>
              <ArrowUpRight className="event-icon" size={16} />
            </div>
          </div>

          <div className="news-ticker-box">
            <div className="section-header">
              <Newspaper size={14} />
              <span>Live News</span>
            </div>
            <div className="news-content">
              <p key={activeNews} className="news-text fade-in">
                {newsItems[activeNews]}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* REPOSITORY PREVIEW SIDE DRAWER */}
      <AnimatePresence>
        {isPreviewOpen && selectedRepo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <FolderTree size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-none">{selectedRepo.name}</h2>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider">Public Repository</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">

                {/* Repo Meta */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">About</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedRepo.description || "No description provided for this repository. It is currently a part of the Bitnest community exploration."}
                  </p>
                </section>

                <div className="h-px bg-slate-100" />

                {/* Owner Section */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Owner</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                        {selectedRepo.owner?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <Link
                          to={`/userProfile/${selectedRepo.owner?._id || selectedRepo.owner}`}
                          className="font-bold text-slate-900 hover:text-indigo-600 transition-colors block"
                        >
                          {selectedRepo.owner?.username || "Unknown Developer"}
                        </Link>
                        <p className="text-xs text-slate-500">Member since Dec 2025</p>
                      </div>
                    </div>

                    {/* Follow/Unfollow Btn */}
                    {userId !== (selectedRepo.owner?._id || selectedRepo.owner) && (
                      <button
                        onClick={handleFollow}
                        disabled={followingLoading}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${isFollowing
                            ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-sm'
                          }`}
                      >
                        {followingLoading ? '...' : (isFollowing ? 'Following' : '+ Follow')}
                      </button>
                    )}
                  </div>
                </section>

                <div className="h-px bg-slate-100" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                      <Star size={12} /> Stars
                    </div>
                    <span className="text-xl font-bold text-slate-900">{selectedRepo.stars || 0}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                      <Info size={12} /> Issues
                    </div>
                    <span className="text-xl font-bold text-slate-900">{selectedRepo.issues?.length || 0}</span>
                  </div>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button
                  onClick={handleStarInPreview}
                  disabled={starLoading}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${isStarred
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Star
                    size={18}
                    fill={isStarred ? "currentColor" : "none"}
                    className={isStarred ? "text-amber-400" : ""}
                  />
                  {isStarred ? 'Starred' : 'Star Repo'}
                </button>
                <Link
                  to={`/repo/${selectedRepo._id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all"
                >
                  <ExternalLink size={18} />
                  Open Repo
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}