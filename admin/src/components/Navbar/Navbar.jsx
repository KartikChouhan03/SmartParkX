import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="admin-navbar">
      {/* Left: Title & Welcome */}
      <div className="navbar-left">
        <div className="navbar-header-content">
          <h1 className="navbar-title">Dashboard</h1>
          <p className="navbar-subtitle">Welcome back, Admin</p>
        </div>
      </div>

      {/* Right: User Profile (kept existing but can enhance) */}
      <div className="navbar-right">
        <div className="navbar-user">
          <div className="user-avatar-placeholder">A</div>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
}
