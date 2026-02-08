import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import "./SystemStatus.css";

function StatusItem({ label, status, type }) {
  return (
    <div className="status-item">
      <div className="status-left">
        <span className={`status-dot status-${type}`} />
        <span className="status-label">{label}</span>
      </div>
      <span className={`status-text status-${type}`}>{status}</span>
    </div>
  );
}

export default function SystemStatus() {
  const [refreshing, setRefreshing] = useState(false);
  const [statuses, setStatuses] = useState({
    anpr: { status: "Online", type: "success" },
    sensors: { status: "Active", type: "success" },
    backend: { status: "Connected", type: "success" },
  });

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);

    // Set all to offline initially
    setStatuses({
      anpr: { status: "Offline", type: "danger" },
      sensors: { status: "Offline", type: "danger" },
      backend: { status: "Offline", type: "danger" },
    });

    // Sequential updates
    setTimeout(() => {
      setStatuses((prev) => ({
        ...prev,
        anpr: { status: "Online", type: "success" },
      }));
    }, 1000);

    setTimeout(() => {
      setStatuses((prev) => ({
        ...prev,
        sensors: { status: "Active", type: "success" },
      }));
    }, 2000);

    setTimeout(() => {
      setStatuses((prev) => ({
        ...prev,
        backend: { status: "Connected", type: "success" },
      }));
      setRefreshing(false);
    }, 3000);
  };

  return (
    <div className="system-status">
      <div className="system-status-header">
        <h3 className="system-status-title">System Status</h3>
        <button
          className={`refresh-btn ${refreshing ? "spinning" : ""}`}
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label="Refresh Status"
        >
          <RotateCw size={18} />
        </button>
      </div>

      <div className="status-list">
        <StatusItem
          label="ANPR Camera"
          status={statuses.anpr.status}
          type={statuses.anpr.type}
        />
        <StatusItem
          label="Slot Sensors"
          status={statuses.sensors.status}
          type={statuses.sensors.type}
        />
        {/* Payment System Removed */}
        <StatusItem
          label="Backend API"
          status={statuses.backend.status}
          type={statuses.backend.type}
        />
      </div>
    </div>
  );
}
