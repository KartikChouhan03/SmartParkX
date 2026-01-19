import React from "react";
import "./ParkingStatus.css";
import { Timer } from "lucide-react";
import { useStore } from "../../../Context/StoreContext";

const RATE_PER_HOUR = 50; // keep consistent with backend

const ParkingStatus = () => {
  const { sessions } = useStore();

  if (!sessions || sessions.length === 0) {
    return (
      <div className="parking-status-card">
        <h2>Current Parking Status</h2>
        <p>No active parking session</p>
      </div>
    );
  }

  // For now, show the latest active session
  const session = sessions[0];

  const entryTime = new Date(session.entryTime);
  const now = new Date();
  const diffMs = now - entryTime;

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const bill = Math.ceil(diffMs / (1000 * 60 * 60)) * RATE_PER_HOUR;

  const formatTime = () =>
    `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="parking-status-card">
      <h2>Current Parking Status</h2>

      <div className="status-item">
        <span className="label">Plate Number:</span>
        <span className="value plate">{session.vehicleNumber}</span>
      </div>

      <div className="status-item">
        <span className="label">Entry Time:</span>
        <span className="value">
          {entryTime.toLocaleTimeString()}
        </span>
      </div>

      <div className="status-item">
        <span className="label">Time Parked:</span>
        <span className="value timer">
          <Timer size={18} className="timer-icon" />
          {formatTime()}
        </span>
      </div>

      <div className="status-item">
        <span className="label">Estimated Cost:</span>
        <span className="value">₹{bill}</span>
      </div>
    </div>
  );
};

export default ParkingStatus;
