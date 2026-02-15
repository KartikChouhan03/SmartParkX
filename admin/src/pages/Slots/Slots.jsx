import React, { useState } from "react";
import "./Slots.css";
import SlotCard from "../../components/SlotCard/SlotCard.jsx";

// Initial Mock Data with Hardware details
const INITIAL_SLOTS = [
  { id: "A1", status: "available", lastPing: "2s ago" },
  { id: "A2", status: "occupied", durationMinutes: 45, lastPing: "10s ago" }, // Short stay
  { id: "A3", status: "occupied", durationMinutes: 180, lastPing: "5s ago" }, // Medium stay (3h)
  { id: "A4", status: "maintenance", lastPing: "4h ago" }, // Already maintenance
  { id: "B1", status: "issue", lastPing: "Offline" },
  { id: "B2", status: "available", lastPing: "1s ago" },
  { id: "B3", status: "occupied", durationMinutes: 1500, lastPing: "12s ago" }, // OVERSTAY (>24h)
  { id: "B4", status: "available", lastPing: "3s ago" },
  { id: "B5", status: "occupied", durationMinutes: 620, lastPing: "8s ago" }, // Long stay (10h)
  { id: "B6", status: "issue", lastPing: "Intermittent" },
  { id: "C1", status: "available", lastPing: "2s ago" },
  { id: "C2", status: "occupied", durationMinutes: 20, lastPing: "1s ago" },
];

export default function Slots() {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [heatmapMode, setHeatmapMode] = useState(false);

  // Stats Calculation
  const total = slots.length;
  const occupied = slots.filter((s) => s.status === "occupied").length;
  const available = slots.filter((s) => s.status === "available").length;

  // Toggle Maintenance Mode (Right Click Handler)
  const toggleMaintenance = (slotId) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) => {
        if (slot.id !== slotId) return slot;

        // If it's maintenance, revert to available (or reset logic)
        if (slot.status === "maintenance") {
          return { ...slot, status: "available", durationMinutes: 0 };
        }
        // Otherwise set to maintenance
        return { ...slot, status: "maintenance", durationMinutes: 0 };
      }),
    );
  };

  return (
    <div className="slots-page">
      {/* ===== Header ===== */}
      <div className="slots-header">
        <div className="header-left">
          <h1 className="slots-title">Parking Slots</h1>
          <p className="slots-subtitle">
            Right-click any slot to toggle Maintenance Mode
          </p>
        </div>

        {/* Right Side Actions */}
        <div className="slots-actions">
          {/* Heatmap Toggle */}
          <div className="slots-controls">
            <span className="toggle-label">Heatmap</span>
            <div
              className={`toggle-switch ${heatmapMode ? "active" : ""}`}
              onClick={() => setHeatmapMode(!heatmapMode)}
            />
          </div>

          {/* Summary Widgets */}
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

      {/* ===== Grid ===== */}
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
