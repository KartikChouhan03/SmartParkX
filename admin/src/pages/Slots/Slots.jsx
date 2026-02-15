import React, { useEffect, useState } from "react";
import "./Slots.css";
import SlotCard from "../../components/SlotCard/SlotCard.jsx";
import api from "../../lib/adminApi";

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [heatmapMode, setHeatmapMode] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/admin/slots");

      // Convert backend structure to existing UI structure
      const formatted = res.data.map((slot) => ({
        id: slot.slotNumber,
        _id: slot._id,
        status: slot.isOutOfOrder
          ? "maintenance"
          : slot.isOccupied
            ? "occupied"
            : "available",
        durationMinutes: 0, // We'll calculate later if needed
        lastPing: "Live", // Replace later if you track heartbeat
      }));

      setSlots(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMaintenance = async (slotId) => {
    try {
      const slot = slots.find((s) => s.id === slotId);
      if (!slot) return;

      await api.patch(`/admin/slots/${slot._id}/toggle-maintenance`);

      // Refresh slots after update
      fetchSlots();
    } catch (err) {
      console.error(err);
    }
  };

  const total = slots.length;
  const occupied = slots.filter((s) => s.status === "occupied").length;
  const available = slots.filter((s) => s.status === "available").length;

  return (
    <div className="slots-page">
      <div className="slots-header">
        <div className="header-left">
          <h1 className="slots-title">Parking Slots</h1>
          <p className="slots-subtitle">
            Right-click any slot to toggle Maintenance Mode
          </p>
        </div>

        <div className="slots-actions">
          <div className="slots-controls">
            <span className="toggle-label">Heatmap</span>
            <div
              className={`toggle-switch ${heatmapMode ? "active" : ""}`}
              onClick={() => setHeatmapMode(!heatmapMode)}
            />
          </div>

          <div className="slots-summary">
            <div className="summary-item">
              <span className="summary-label">Total</span>
              <span className="summary-value">{total}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Occupied</span>
              <span className="summary-value danger">{occupied}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Available</span>
              <span className="summary-value success">{available}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="slots-grid">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            heatmapMode={heatmapMode}
            onToggleMaintenance={toggleMaintenance}
          />
        ))}
      </div>
    </div>
  );
}
