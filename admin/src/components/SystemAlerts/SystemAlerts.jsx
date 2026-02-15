import React, { useState } from "react";
import "./SystemAlerts.css";
import {
  AlertTriangle,
  X,
  CheckCircle,
  Bell,
  AlertOctagon,
  Info,
} from "lucide-react";

const INITIAL_ALERTS = [
  {
    id: 1,
    title: "Sensor Malfunction",
    message: "Slot A-12 sensor is not responding. Check connectivity.",
    type: "warning",
    time: "15 min ago",
  },
  {
    id: 2,
    title: "Low Paper Roll",
    message: "Entry Gate 2 ticket dispenser is running low.",
    type: "info",
    time: "1 hour ago",
  },
];

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  // Handle removing an alert (Dismiss or Resolve)
  const handleAction = (id) => {
    // In a real app, you would send an API request here
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Get Icon based on severity
  const getIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertOctagon size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className="system-alerts">
      {/* Header */}
      <div className="alerts-header">
        <div className="header-left">
          <h3 className="alerts-title">System Alerts</h3>
        </div>
        {alerts.length > 0 && (
          <div className="header-right">
            <span className="alert-count">{alerts.length}</span>
            <button className="clear-all-btn" onClick={() => setAlerts([])}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Alerts List */}
      <div className="alerts-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className={`alert-card type-${alert.type}`}>
              {/* Left Side: Icon & Content */}
              <div className="alert-main">
                <div className="alert-icon-box">{getIcon(alert.type)}</div>
                <div className="alert-content">
                  <div className="alert-top-row">
                    <span className="alert-name">{alert.title}</span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <p className="alert-msg">{alert.message}</p>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="alert-actions">
                <button
                  className="action-btn resolve"
                  title="Mark Resolved"
                  onClick={() => handleAction(alert.id)}
                >
                  <CheckCircle size={18} />
                </button>
                <button
                  className="action-btn dismiss"
                  title="Dismiss"
                  onClick={() => handleAction(alert.id)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-alerts">
            <CheckCircle size={40} className="empty-icon" />
            <p>All systems operational</p>
            <span>No active alerts at this time.</span>
          </div>
        )}
      </div>
    </div>
  );
}
