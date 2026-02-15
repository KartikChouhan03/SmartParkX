import React, { useEffect, useState } from "react";
import "./ANPRLogs.css";
import {
  Search,
  Eye,
  X,
  Clock,
  MapPin,
  Car,
  LogIn,
  LogOut,
  CreditCard,
} from "lucide-react";
import api from "../../lib/adminApi";

export default function ANPRLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gateFilter, setGateFilter] = useState("All Gates");
  const [dateFilter, setDateFilter] = useState("Today");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/anpr/logs");

      const formatted = res.data.map((session) => {
        const type = session.status === "ACTIVE" ? "ENTRY" : "EXIT";

        let uiStatus = "active";
        if (session.status === "COMPLETED") {
          uiStatus = session.paymentStatus === "PAID" ? "completed" : "flagged";
        }

        return {
          _id: session._id,
          plate: session.vehicleNumber,
          type,
          entryTime: session.entryTime,
          exitTime: session.exitTime,
          status: uiStatus,
          paymentStatus: session.paymentStatus,
        };
      });

      setLogs(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.plate
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGate =
      gateFilter === "All Gates" ||
      (gateFilter === "Entry" && log.type === "ENTRY") ||
      (gateFilter === "Exit" && log.type === "EXIT");

    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "active" && log.status === "active") ||
      (statusFilter === "completed" && log.status === "completed") ||
      (statusFilter === "flagged" && log.status === "flagged");

    return matchesSearch && matchesGate && matchesStatus;
  });

  return (
    <div className="anpr-page">
      <div className="anpr-header">
        <div>
          <h1 className="anpr-title">ANPR Audit Logs</h1>
          <p className="anpr-subtitle">
            Real-time monitoring of all vehicle entry and exit activity.
          </p>
        </div>

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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="flagged">Unpaid/Flagged</option>
          </select>

          <div className="search-box full-width">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search Plate Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

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
              <tr key={log._id} onClick={() => setSelectedLog(log)}>
                <td>
                  <span className="plate-cell">{log.plate}</span>
                </td>

                <td>
                  <span className="gate-type">{log.type}</span>
                </td>

                <td>
                  <div className="gate-info">
                    <span className="gate-name">
                      {formatDate(
                        log.type === "ENTRY" ? log.entryTime : log.exitTime,
                      )}
                    </span>
                  </div>
                </td>

                <td>
                  <span
                    className={`status ${
                      log.status === "completed"
                        ? "completed"
                        : log.status === "flagged"
                          ? "unpaid"
                          : "active"
                    }`}
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

      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Session Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedLog(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Vehicle Summary */}
              <div className="vehicle-summary">
                <div className="vehicle-icon-placeholder">
                  <Car size={40} />
                </div>
                <div className="vehicle-identity">
                  <h2>{selectedLog.plate}</h2>
                  <span
                    className={`status-badge ${
                      selectedLog.status === "active" ? "active" : "completed"
                    }`}
                  >
                    {selectedLog.status === "active"
                      ? "Currently Parked"
                      : "Checked Out"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="details-grid">
                <div className="detail-item">
                  <LogIn size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Entry Time</span>
                    <div className="detail-value">
                      {formatDate(selectedLog.entryTime)}
                    </div>
                  </div>
                </div>

                {selectedLog.exitTime && (
                  <div className="detail-item">
                    <LogOut size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Exit Time</span>
                      <div className="detail-value">
                        {formatDate(selectedLog.exitTime)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="detail-item">
                  <CreditCard size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Payment Status</span>
                    <div
                      className="detail-value"
                      style={{
                        color:
                          selectedLog.paymentStatus === "PAID"
                            ? "var(--success)"
                            : "var(--danger)",
                      }}
                    >
                      {selectedLog.paymentStatus || "PENDING"}
                    </div>
                  </div>
                </div>

                <div className="detail-item">
                  <MapPin size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Gate / Type</span>
                    <div className="detail-value">{selectedLog.type}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary full-width"
                onClick={() => setSelectedLog(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
