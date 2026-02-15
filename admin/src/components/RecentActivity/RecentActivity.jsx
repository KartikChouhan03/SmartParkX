import React, { useEffect, useState } from "react";
import "./RecentActivity.css";
import { LogIn, LogOut, ChevronRight, X, Car, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/adminApi.jsx";

export default function RecentActivity() {
  const [logs, setLogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/dashboard/recent-activity");
      setLogs(res.data.slice(0, 6)); // only first 6 for widget
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3 className="activity-title">Vehicle Logs</h3>
        <span className="live-badge">Live</span>
      </div>

      <div className="activity-list-container">
        <div className="activity-list">
          {logs.map((item) => {
            const isEntry = item.status === "ACTIVE";

            return (
              <div
                key={item._id}
                className="activity-row"
                onClick={() => setSelected(item)}
              >
                <div
                  className={`activity-icon ${
                    isEntry ? "icon-entry" : "icon-exit"
                  }`}
                >
                  {isEntry ? <LogIn size={18} /> : <LogOut size={18} />}
                </div>

                <div className="activity-info">
                  <div className="activity-plate">{item.vehicleNumber}</div>
                  <div className="activity-meta">
                    <span
                      className={`status-pill ${isEntry ? "entry" : "exit"}`}
                    >
                      {isEntry ? "ENTRY" : "EXIT"}
                    </span>
                    <span className="dot-separator">•</span>
                    <span className="activity-time">
                      {formatTime(item.entryTime)}
                    </span>
                  </div>
                </div>

                <button className="btn-details">
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="activity-footer">
        <button className="view-all-btn" onClick={() => navigate("/anpr-logs")}>
          View All Logs
        </button>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Session Details</h3>
              <button className="close-btn" onClick={() => setSelected(null)}>
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
                  <h2>{selected.vehicleNumber}</h2>
                  <span
                    className={`status-badge ${
                      selected.status === "ACTIVE" ? "active" : "completed"
                    }`}
                  >
                    {selected.status === "ACTIVE"
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
                      {formatTime(selected.entryTime)}
                    </div>
                  </div>
                </div>

                {selected.exitTime && (
                  <div className="detail-item">
                    <LogOut size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Exit Time</span>
                      <div className="detail-value">
                        {formatTime(selected.exitTime)}
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
                          selected.paymentStatus === "PAID"
                            ? "var(--success)"
                            : "var(--danger)",
                      }}
                    >
                      {selected.paymentStatus || "PENDING"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary full-width"
                onClick={() => setSelected(null)}
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
