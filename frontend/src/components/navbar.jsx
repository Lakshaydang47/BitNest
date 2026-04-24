import React from "react";
import { Link } from "react-router-dom";
import { PlusSquare, UserCircle, LayoutDashboard, Star, Terminal } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  // 1. Grab the userId from local storage when the Navbar loads
  const userId = localStorage.getItem("userId");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Left Side: Logo & Brand */}
        <Link to="/" className="nav-logo-group">
          <div className="nav-logo-icon">B</div>
          <h3 className="nav-brand-name">Bitnest</h3>
        </Link>

        {/* Right Side: Navigation Links */}
        <div className="nav-links">
          <Link to="/features/docs" className="nav-item hide-mobile">
            <LayoutDashboard size={18} />
            <span>Documentation</span>
          </Link>

          <Link to="/cli-guide" className="nav-item hide-mobile">
            <Terminal size={18} />
            <span>How to Install in your System</span>
          </Link>

          <Link to="/repo/create" className="nav-item">
            <PlusSquare size={18} />
            <span className="hide-mobile">Create</span>
          </Link>

          <Link to="/starred" className="nav-item">
            <Star size={18} />
            <span className="hide-mobile">Starred</span>
          </Link>

          <div className="nav-divider hide-mobile"></div>

          {/* 2. Dynamically inject the userId into the path */}
          <Link 
            to={userId ? `/userProfile/${userId}` : "/login"} 
            className="nav-item nav-profile"
          >
            <UserCircle size={20} />
            <span className="hide-mobile">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;