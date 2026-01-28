import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  SquareParking,
  ScanLine,
  Receipt,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo} alt="SmartParkX Logo" />
        </div>
        <div>
          <div className="sidebar-brand">SmartParkX</div>
          <div className="sidebar-subtitle">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">MAIN</div>

        <NavLink to="/" end className="sidebar-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <div className="nav-section-label">MANAGEMENT</div>

        <NavLink to="/slots" className="sidebar-link">
          <SquareParking size={20} />
          <span>Parking Slots</span>
        </NavLink>

        <NavLink to="/anpr" className="sidebar-link">
          <ScanLine size={20} />
          <span>ANPR Logs</span>
        </NavLink>

        <div className="nav-section-label">SYSTEM</div>

        <NavLink to="/billing" className="sidebar-link">
          <Receipt size={20} />
          <span>Billing</span>
        </NavLink>

        <NavLink to="/logs" className="sidebar-link">
          <FileText size={20} />
          <span>System Logs</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
