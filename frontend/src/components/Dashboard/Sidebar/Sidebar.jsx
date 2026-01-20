import { Home, Car, CreditCard, Settings, LogOut } from "lucide-react";
import "./Sidebar.css";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <img src={assets.logo} alt="logo" />
          <p>SmartParkX</p>
        </div>

        <div className="sidebar-options">
          <a href="/dashboard" className="sidebar-item">
            <Home size={20} /> Dashboard
          </a>
          <a href="/myparking" className="sidebar-item">
            <Car size={20} /> My Parking
          </a>
          <a href="/billhistory" className="sidebar-item">
            <CreditCard size={20} /> Bill History
          </a>
          <a href="/settings" className="sidebar-item">
            <Settings size={20} /> Settings
          </a>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="user-card">
          <img
            src="https://ui-avatars.com/api/?name=Kartik&background=random"
            alt="User Avatar"
            className="user-avatar"
          />
          <div>
            <p className="user-name">Kartik</p>
            <button onClick={() => navigate("/")} className="logout">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
