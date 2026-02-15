import React, { useState, useEffect } from "react";
import { RotateCw, Wifi, Clock, Activity, Server, Zap } from "lucide-react";
import "./SystemStatus.css";

function StatusGauge({ label, status, type, icon: Icon }) {
  return (
    <div className={`status-gauge type-${type}`}>
      <div className="gauge-ring">
        <div className="gauge-icon">
          <Icon size={20} />
        </div>
        {status === "Offline" && <div className="offline-overlay" />}
      </div>
      <span className="gauge-label">{label}</span>
      <span className={`gauge-status status-${type}`}>{status}</span>
    </div>
  );
}

function VitalSign({ label, value, icon: Icon, color }) {
  return (
    <div className="vital-sign">
      <div
        className="vital-icon"
        style={{ backgroundColor: color + "20", color: color }}
      >
        <Icon size={16} />
      </div>
      <div className="vital-info">
        <span className="vital-label">{label}</span>
        <span className="vital-value">{value}</span>
      </div>
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
        <h3 className="system-status-title">System Health</h3>
        <button
          className={`refresh-btn ${refreshing ? "spinning" : ""}`}
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label="Refresh Status"
        >
          <RotateCw size={16} />
        </button>
      </div>

      {/* Gauges Row */}
      <div className="status-gauges">
        <StatusGauge
          label="ANPR"
          status={statuses.anpr.status}
          type={statuses.anpr.type}
          icon={Zap}
        />
        <StatusGauge
          label="Sensors"
          status={statuses.sensors.status}
          type={statuses.sensors.type}
          icon={Activity}
        />
        <StatusGauge
          label="Backend"
          status={statuses.backend.status}
          type={statuses.backend.type}
          icon={Server}
        />
      </div>

      <div className="divider" />

      {/* Vital Signs Row */}
      <div className="vital-signs">
        <VitalSign label="Uptime" value="14d 2h" icon={Clock} color="#2563eb" />
        <VitalSign
          label="Signal"
          value="Excellent"
          icon={Wifi}
          color="#16a34a"
        />
        <VitalSign
          label="Last Sync"
          value="2s ago"
          icon={RotateCw}
          color="#9333ea"
        />
      </div>
    </div>
  );
}
