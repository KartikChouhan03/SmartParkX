import React, { useState } from "react";
import "./RecentActivity.css";
import {
  Car,
  LogIn,
  LogOut,
  ChevronRight,
  X,
  Clock,
  MapPin,
  User,
  Phone,
} from "lucide-react";

import { VEHICLE_LOGS_DATA } from "../../data/mockData";

// Slice the first 6 items for the widget
const VEHICLE_LOGS = VEHICLE_LOGS_DATA.slice(0, 6);

import { useNavigate } from "react-router-dom";

export default function RecentActivity() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="recent-activity">
      {/* Header */}
      <div className="activity-header">
        <h3 className="activity-title">Vehicle Logs</h3>
        <span className="live-badge">Live</span>
      </div>

      {/* List */}
      <div className="activity-list-container">
        <div className="activity-list">
          {VEHICLE_LOGS.map((item) => (
            <div
              key={item.id}
              className="activity-row"
              onClick={() => setSelectedVehicle(item)} // Make whole row clickable
            >
              {/* Icon based on Entry/Exit */}
              <div
                className={`activity-icon ${item.type === "ENTRY" ? "icon-entry" : "icon-exit"}`}
              >
                {item.type === "ENTRY" ? (
                  <LogIn size={18} />
                ) : (
                  <LogOut size={18} />
                )}
              </div>

              {/* Info */}
              <div className="activity-info">
                <div className="activity-plate">{item.plate}</div>
                <div className="activity-meta">
                  <span className={`status-pill ${item.type.toLowerCase()}`}>
                    {item.type}
                  </span>
                  <span className="dot-separator">•</span>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>

              {/* Arrow */}
              <button className="btn-details">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="activity-footer">
        <button className="view-all-btn" onClick={() => navigate("/anpr-logs")}>
          View All Logs
        </button>
      </div>

      {/* ===========================
          POPUP MODAL 
         =========================== */}
      {selectedVehicle && (
        <div className="modal-overlay" onClick={() => setSelectedVehicle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3>Vehicle Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedVehicle(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Car Image + Plate */}
              <div className="vehicle-summary">
                <img
                  src={selectedVehicle.img}
                  alt="Car"
                  className="vehicle-img"
                />
                <div className="vehicle-identity">
                  <h2>{selectedVehicle.plate}</h2>
                  <span className={`status-badge ${selectedVehicle.status}`}>
                    {selectedVehicle.status === "active"
                      ? "Currently Parked"
                      : "Checked Out"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="details-grid">
                <div className="detail-item">
                  <User size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Owner</span>
                    <div className="detail-value">{selectedVehicle.owner}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Phone size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Contact</span>
                    <div className="detail-value">{selectedVehicle.phone}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">
                      {selectedVehicle.type === "ENTRY"
                        ? "Entry Time"
                        : "Duration"}
                    </span>
                    <div className="detail-value">
                      {selectedVehicle.type === "ENTRY"
                        ? selectedVehicle.time
                        : selectedVehicle.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                className="btn-primary full-width"
                onClick={() => setSelectedVehicle(null)}
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
