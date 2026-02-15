import React from "react";
import "./SlotCard.css";
import { Clock, AlertTriangle } from "lucide-react";

export default function SlotCard({ slot, heatmapMode, onToggleMaintenance }) {
  const { id, status, durationMinutes, lastPing } = slot;

  // Helper: Format minutes into "2h 15m"
  const formatDuration = (mins) => {
    if (!mins) return "--";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };


  const getHeatmapClass = () => {
    if (!heatmapMode || status !== "occupied") return "";
    if (durationMinutes < 60) return "hm-short"; // < 1 hr
    if (durationMinutes < 300) return "hm-medium"; // < 5 hrs
    return "hm-long"; // > 5 hrs
  };


  const isOverstay = status === "occupied" && durationMinutes > 1440;

  // Handle Right Click for Maintenance
  const handleContextMenu = (e) => {
    e.preventDefault(); // Stop default browser menu
    onToggleMaintenance(id);
  };

  // Dynamic Classes
  const cardClasses = `
    slot-card 
    ${status} 
    ${heatmapMode ? "heatmap-active" : ""} 
    ${getHeatmapClass()}
    ${isOverstay ? "overstay" : ""}
  `;

  return (
    <div
      className={cardClasses}
      onContextMenu={handleContextMenu}
      title="Right-click to toggle Maintenance"
    >
      {/* Tooltip: Hardware Health */}
      <div className="heartbeat-tooltip">Last ping: {lastPing}</div>

      <div className="slot-content">
        {/* Header */}
        <div className="slot-header">
          <span className="slot-id">{id}</span>
          <div className="slot-indicator" />
        </div>

        {/* Footer */}
        <div className="slot-footer">
          <span className="slot-status-text">
            {status === "maintenance" ? "Out of Order" : status}
          </span>

          {/* Duration Display (Only for Occupied) */}
          {status === "occupied" && (
            <div className="slot-duration">
              {isOverstay ? <AlertTriangle size={12} /> : <Clock size={12} />}
              <span>{formatDuration(durationMinutes)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
