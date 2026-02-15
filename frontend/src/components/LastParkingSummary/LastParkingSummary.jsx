import React, { useEffect, useState } from "react";
import "./LastParkingSummary.css";
import { useStore } from "../../Context/StoreContext";

const LastParkingSummary = () => {
  const { activeSession, lastSession } = useStore();

  // Only show when parking is completed
  if (activeSession || !lastSession) return null;

  const entry = new Date(lastSession.entryTime);
  const exit = new Date(lastSession.exitTime);

  const durationMs = exit - entry;
  const minutes = Math.ceil(durationMs / (1000 * 60));

  return (
    <div className="parking-summary-card">
      <div className="summary-header">
        <h2>Parking Completed</h2>
        <span className="badge completed">DONE</span>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Vehicle</span>
          <strong>{lastSession.vehicleNumber}</strong>
        </div>

        <div className="summary-item">
          <span>Slot</span>
          <strong>{lastSession.slot || "—"}</strong>
        </div>

        <div className="summary-item">
          <span>Entry Time</span>
          <strong>{entry.toLocaleString()}</strong>
        </div>

        <div className="summary-item">
          <span>Exit Time</span>
          <strong>{exit.toLocaleString()}</strong>
        </div>

        <div className="summary-item">
          <span>Total Duration</span>
          <strong>{minutes} minutes</strong>
        </div>

        <div className="summary-item total">
          <span>Total Bill</span>
          <strong>₹{lastSession.billAmount}</strong>
        </div>

        <div className="summary-item">
          <span>Payment Status</span>
          <strong
            style={{
              color: lastSession.paymentStatus === "PAID" ? "green" : "red",
            }}
          >
            {lastSession.paymentStatus}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default LastParkingSummary;
