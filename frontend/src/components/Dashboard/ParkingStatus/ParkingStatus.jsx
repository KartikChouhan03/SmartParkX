import React, { useEffect, useState } from "react";
import "./ParkingStatus.css";
import { Timer } from "lucide-react";
import { useStore } from "../../../Context/StoreContext";

const RATE_PER_HOUR = 50;

const ParkingStatus = () => {
  const { activeSession } = useStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!activeSession) return;

    const entryTime = new Date(activeSession.entryTime).getTime();
    setSeconds(Math.floor((Date.now() - entryTime) / 1000));

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  if (!activeSession) {
    return (
      <div className="parking-status-card">
        <h2>Active Parking</h2>
        <p className="label">No active parking session</p>
      </div>
    );
  }

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const estimatedCost = ((seconds / 3600) * RATE_PER_HOUR).toFixed(0);

  return (
    <div className="parking-status-card">
      <div className="card-header">
        <h2>Active Parking</h2>
        <span className="status-badge active">LIVE</span>
      </div>

      <div className="status-grid">
        <div className="status-item">
          <span className="label">Vehicle</span>
          <span className="value plate">{activeSession.vehicleNumber}</span>
        </div>

        <div className="status-item">
          <span className="label">Slot</span>
          <span className="value slot">
            {activeSession.slot ? (
              activeSession.slot
            ) : (
              <span className="pending">Auto-assigning</span>
            )}
          </span>
        </div>

        <div className="status-item">
          <span className="label">Duration</span>
          <span className="value timer-display">
            <Timer size={16} />
            <span className="mono">{formatTime(seconds)}</span>
          </span>
        </div>

        <div className="status-item highlight">
          <span className="label">Estimated Bill</span>
          <span className="value cost">₹{estimatedCost}</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingStatus;
