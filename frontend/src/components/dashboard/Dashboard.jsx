import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FolderTree, Search, Calendar, Star, Globe, 
  ChevronRight, Plus, Zap, Newspaper, ArrowUpRight, Clock 
} from "lucide-react";
import axios from "axios";
import Navbar from "../navbar";
import "./dashboard.css";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeNews, setActiveNews] = useState(0);

  const newsItems = [
    "Bitnest v2.4 rollout scheduled for Friday.",
    "Global: 1.2M commits processed this hour.",
    "New security patch for Node.js repositories.",
    "Community: 50+ new projects joined Bitnest today."
  ];

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        // Matches: repoRouter.get("/repo/user/:userID")
        const userReposRes = await axios.get(`http://localhost:3002/repo/user/${userId}`);
        setRepositories(userReposRes.data.repositories || []);

        // Matches: repoRouter.get("/repo/all")
        const allReposRes = await axios.get(`http://localhost:3002/repo/all`);
        setSuggestedRepositories(allReposRes.data || []);
      } catch (err) {
        console.error("Error fetching Dashboard data:", err);
      }
    };

    if (userId) fetchData();
  }, []);

  // Search Logic: Combines personal and public repos
  useEffect(() => {
    const allAvailableRepos = [...repositories, ...suggestedRepositories];
    
    // Ensure unique IDs using a Map
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
              <Link key={repo._id} to={`/repo/${repo._id}`} className="suggested-item">
                <div className="dot"></div>
                <div className="details">
                  <p className="name">{repo.name}</p>
                  <p className="meta">Public • Bitnest</p>
                </div>
              </Link>
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
                  to={`/repo/${repo._id}`} // FIXED: Redirects to specific repo ID
                  className="repo-card"
                >
                  <div className="card-header">
                    <FolderTree size={20} className={isMine ? "text-indigo" : "text-emerald"} />
                    <span className={`badge ${isMine ? 'mine' : 'public'}`}>
                      {isMine ? 'Private' : 'Public'}
                    </span>
                  </div>
                  <h3 className="repo-title">{repo.name}</h3>
                  <p className="repo-desc">
                    {repo.description || "A professional version control project built on Bitnest."}
                  </p>
                  <div className="card-footer">
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
    </div>
  );
}