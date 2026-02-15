import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  ExternalLink,
  RefreshCw,
  Server,
  Activity,
  Zap,
} from "lucide-react";
import "./SystemLogs.css";

// Mock Data for Logs
const MOCK_LOGS = [
  {
    id: 1,
    time: "2026-09-12T11:05:00",
    source: "Billing",
    message: "Payment confirmed manually for MH12AB1234",
    severity: "info",
    resolved: false,
    link: "/billing",
  },
  {
    id: 2,
    time: "2026-09-12T10:48:00",
    source: "ANPR",
    message: "Camera 2 disconnected",
    severity: "warning",
    resolved: false,
    link: "/anpr-logs",
  },
  {
    id: 3,
    time: "2026-09-12T10:22:00",
    source: "Sensors",
    message: "Slot B6 sensor not responding",
    severity: "critical",
    resolved: false,
    link: "/slots",
  },
  {
    id: 4,
    time: "2026-09-12T09:15:00",
    source: "System",
    message: "Daily backup completed successfully",
    severity: "info",
    resolved: true,
    link: "/settings",
  },
  {
    id: 5,
    time: "2026-09-12T08:30:00",
    source: "Auth",
    message: "Failed login attempt from IP 192.168.1.105",
    severity: "warning",
    resolved: false,
    link: "/users",
  },
  {
    id: 6,
    time: "2026-09-12T04:00:00",
    source: "Database",
    message: "Connection timeout - Auto-reconnected",
    severity: "critical",
    resolved: true,
    link: "/system",
  },
];

export default function SystemLogs() {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [quickFilter, setQuickFilter] = useState(null); // 'offline', 'disconnected', etc.

  // handle resolving a log
  const handleResolve = (id) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, resolved: true } : log)),
    );
  };

  // Filter Logic
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // 1. Text Search
      const matchesSearch =
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.severity.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Source Filter
      let matchesSource = true;
      if (sourceFilter !== "All") {
        matchesSource = log.source === sourceFilter;
      }

      // 3. Severity Filter
      let matchesSeverity = true;
      if (severityFilter === "Critical") {
        matchesSeverity = log.severity === "critical";
      } else if (severityFilter === "Warning") {
        matchesSeverity =
          log.severity === "warning" || log.severity === "critical";
      }

      // 4. Quick Health Filters (from Cards)
      let matchesQuickFilter = true;
      if (quickFilter === "offline") {
        matchesQuickFilter =
          log.source === "ANPR" &&
          (log.severity === "critical" || log.severity === "warning");
      } else if (quickFilter === "disconnected") {
        matchesQuickFilter =
          log.source === "Sensors" &&
          (log.severity === "critical" || log.severity === "warning");
      }

      return (
        matchesSearch && matchesSource && matchesSeverity && matchesQuickFilter
      );
    });
  }, [logs, searchTerm, sourceFilter, severityFilter, quickFilter]);

  // Card Click Handlers
  const handleCardClick = (type) => {
    if (quickFilter === type) {
      setQuickFilter(null);
    } else {
      setQuickFilter(type);
      setSourceFilter("All");
      setSeverityFilter("All");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSourceFilter("All");
    setSeverityFilter("All");
    setQuickFilter(null);
  };

  return (
    <div className="system-page">
      {/* ===== Header ===== */}
      <div className="system-header">
        <div>
          <h1 className="system-title">System Health & Logs</h1>
          <p className="system-subtitle">
            Active Diagnostic Tool & System Events
          </p>
        </div>
        <button className="refresh-logs-btn" onClick={clearFilters}>
          <RefreshCw size={18} />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* ===== Interactive Health Grid ===== */}
      <div className="health-grid">
        <div className="health-card healthy">
          <div className="card-icon success">
            <Server size={24} />
          </div>
          <div className="card-content">
            <span className="health-label">Backend API</span>
            <span className="health-status">Online</span>
          </div>
        </div>

        <div className="health-card healthy">
          <div className="card-icon success">
            <Activity size={24} />
          </div>
          <div className="card-content">
            <span className="health-label">Database</span>
            <span className="health-status">Connected</span>
          </div>
        </div>

        <div
          className={`health-card warning clickable ${
            quickFilter === "offline" ? "active" : ""
          }`}
          onClick={() => handleCardClick("offline")}
          title="Click to filter ANPR logs"
        >
          <div className="card-icon warning">
            <Zap size={24} />
          </div>
          <div className="card-content">
            <span className="health-label">ANPR Camera</span>
            <span className="health-status">1 Offline</span>
          </div>
          {quickFilter === "offline" && (
            <div className="active-indicator">Filtering</div>
          )}
        </div>

        <div
          className={`health-card danger clickable ${
            quickFilter === "disconnected" ? "active" : ""
          }`}
          onClick={() => handleCardClick("disconnected")}
          title="Click to filter Sensor logs"
        >
          <div className="card-icon danger">
            <XCircle size={24} />
          </div>
          <div className="card-content">
            <span className="health-label">Slot Sensors</span>
            <span className="health-status">2 Disconnected</span>
          </div>
          {quickFilter === "disconnected" && (
            <div className="active-indicator">Filtering</div>
          )}
        </div>
      </div>

      {/* ===== Controls Bar ===== */}
      <div className="controls-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-wrapper">
          <div className="filter-group">
            <span className="filter-label">Source</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Sources</option>
              <option value="ANPR">ANPR Camera</option>
              <option value="Sensors">Slot Sensors</option>
              <option value="Billing">Billing</option>
              <option value="System">System</option>
              <option value="Database">Database</option>
              <option value="Auth">Auth</option>
            </select>
          </div>

          <div className="filter-group">
            <span className="filter-label">Severity</span>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${
                  severityFilter === "All" ? "active" : ""
                }`}
                onClick={() => setSeverityFilter("All")}
              >
                All
              </button>
              <button
                className={`toggle-btn ${
                  severityFilter === "Warning" ? "active" : ""
                }`}
                onClick={() => setSeverityFilter("Warning")}
              >
                Warning+
              </button>
              <button
                className={`toggle-btn ${
                  severityFilter === "Critical" ? "active" : ""
                }`}
                onClick={() => setSeverityFilter("Critical")}
              >
                Critical
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Logs Table ===== */}
      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th className="w-12">Status</th>
              <th>Time</th>
              <th>Source</th>
              <th>Message</th>
              <th>Severity</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`log-row ${log.resolved ? "resolved" : ""}`}
                >
                  <td className="status-cell">
                    {log.resolved ? (
                      <CheckCircle
                        size={18}
                        className="status-icon resolved"
                        title="Resolved"
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                        className={`status-icon ${log.severity}`}
                        title="Unresolved"
                      />
                    )}
                  </td>
                  <td className="time-cell">
                    {new Date(log.time).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <span className="source-badge">{log.source}</span>
                  </td>
                  <td className="message-cell">{log.message}</td>
                  <td>
                    <span className={`severity-badge ${log.severity}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      {!log.resolved && (
                        <button
                          className="action-btn resolve-btn"
                          onClick={() => handleResolve(log.id)}
                          title="Mark as Resolved"
                        >
                          <CheckCircle size={14} />
                          <span>Resolve</span>
                        </button>
                      )}
                      <a
                        href={log.link}
                        className="action-btn context-btn"
                        title="View Context"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-content">
                    <Info size={32} />
                    <p>No logs found matching your filters</p>
                    <button
                      className="clear-filters-link"
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
