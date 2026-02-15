import React, { useState } from "react";
import "./ANPRLogs.css";
import {
  Search,
  Filter,
  Eye,
  X,
  AlertCircle,
  User,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { VEHICLE_LOGS_DATA } from "../../data/mockData";

export default function ANPRLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gateFilter, setGateFilter] = useState("All Gates");
  const [dateFilter, setDateFilter] = useState("Today");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedLog, setSelectedLog] = useState(null); // For Modal

  // Filter Logic
  const filteredLogs = VEHICLE_LOGS_DATA.filter((log) => {
    const matchesSearch = log.plate
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Gate Filter
    const matchesGate =
      gateFilter === "All Gates" ||
      (gateFilter === "Entry" && log.type === "ENTRY") ||
      (gateFilter === "Exit" && log.type === "EXIT") ||
      log.gate === gateFilter;

    // Date Filter (Mock logic as data is static "Today"/"Yesterday")
    const matchesDate =
      dateFilter === "All Dates" ||
      dateFilter === log.date ||
      (dateFilter === "Today" && log.date === "Today") ||
      (dateFilter === "Yesterday" &&
        (log.date === "Yesterday" || log.date === "11 Sep"));

    // Status Filter
    const matchesStatus =
      statusFilter === "All Status" ||
      log.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesGate && matchesDate && matchesStatus;
  });

  return (
    <div className="anpr-page">
      {/* ===== Header ===== */}
      <div className="anpr-header">
        <div>
          <h1 className="anpr-title">ANPR Audit Logs</h1>
          <p className="anpr-subtitle">
            Real-time monitoring of all vehicle entry and exit activity.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="anpr-controls">
          <select
            className="control-select"
            value={gateFilter}
            onChange={(e) => setGateFilter(e.target.value)}
          >
            <option>All Gates</option>
            <option value="Entry">Entry</option>
            <option value="Exit">Exit</option>
          </select>

          <select
            className="control-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option>All Dates</option>
            <option>Today</option>
            <option>Yesterday</option>
          </select>

          <select
            className="control-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="flagged">Unpaid/Flagged</option>
          </select>

          <div className="search-box full-width">
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder="Search Plate Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="anpr-table-wrapper">
        <table className="anpr-table">
          <thead>
            <tr>
              <th>Vehicle Plate</th>
              <th>Gate / Location</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                onClick={() => {
                  console.log("Clicked row:", log);
                  setSelectedLog(log);
                }}
              >
                <td>
                  <span className="plate-cell">{log.plate}</span>
                </td>
                <td>
                  <span className="gate-type">{log.type}</span>
                </td>
                <td>
                  <div className="gate-info">
                    <span className="gate-name">{log.time}</span>
                    <span className="gate-type" style={{ marginTop: 2 }}>
                      {log.date}
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    className={`status ${log.status === "completed" ? "completed" : log.status === "flagged" ? "unpaid" : "active"}`}
                  >
                    {log.status === "flagged" ? "Unpaid" : log.status}
                  </span>
                </td>
                <td>
                  <Eye size={18} className="action-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Enhanced Detail Modal ===== */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3>Vehicle Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedLog(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Car Image + Plate */}
              <div className="vehicle-summary">
                <img src={selectedLog.img} alt="Car" className="vehicle-img" />
                <div className="vehicle-identity">
                  <h2>{selectedLog.plate}</h2>
                  <span
                    className={`status-badge ${selectedLog.status === "active" ? "active" : "completed"}`}
                  >
                    {selectedLog.status}
                  </span>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="details-grid">
                <div className="detail-item">
                  <User size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Owner</span>
                    <div className="detail-value">
                      {selectedLog.owner || "Unknown"}
                    </div>
                  </div>
                </div>

                <div className="detail-item">
                  <Phone size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Contact</span>
                    <div className="detail-value">
                      {selectedLog.phone || "--"}
                    </div>
                  </div>
                </div>

                <div className="detail-item">
                  <MapPin size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Gate Info</span>
                    <div className="detail-value">
                      {selectedLog.gate} ({selectedLog.type})
                    </div>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">
                      {selectedLog.type === "ENTRY" ? "Entry Time" : "Duration"}
                    </span>
                    <div className="detail-value">
                      {selectedLog.type === "ENTRY"
                        ? `${selectedLog.time}, ${selectedLog.date}`
                        : selectedLog.duration || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                className="btn-primary full-width"
                onClick={() => setSelectedLog(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
