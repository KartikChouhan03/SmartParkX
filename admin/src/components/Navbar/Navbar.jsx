import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="admin-navbar">
      {/* Left */}
      <div className="navbar-left">
        <h1 className="navbar-title">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <div className="navbar-user">
          <span className="user-name">Hello, Admin</span>
        </div>
      </div>
    </header>
  );
}
