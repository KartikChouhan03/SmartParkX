import React from "react";
import "./SlotCard.css";

export default function SlotCard({ slotId, status }) {
  // Map status to display text
  const getStatusText = (s) => {
    switch (s) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "issue":
        return "Sensor Issue";
      default:
        return s;
    }
  };

  return (
    <div className={`slot-card ${status}`}>
      {/* Content */}
      <div className="slot-content">
        <div className="slot-header">
          <span className="slot-id">{slotId}</span>
          <div className="slot-indicator" />
        </div>

        <div className="slot-footer">
          <span className="slot-status-text">{getStatusText(status)}</span>
        </div>
      </div>

      {/* Interactive Glow Effects */}
      <div className="slot-glow" />
    </div>
  );
}
