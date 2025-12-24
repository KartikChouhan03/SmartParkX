import React, { useState, useEffect } from "react";
import "./ParkingStatus.css";
import { Timer } from "lucide-react";

const ParkingStatus = () => {
  const slotNumber = 3;
  const ratePerHour = 20;


  const plateNumber = "MP04ZA0011";

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  
  };

  // Cost estimation
  const hours = seconds / 3600;
  const estimatedCost = (hours * ratePerHour).toFixed(2);

  return (
    <div className="parking-status-card">
      <h2>Current Parking Status</h2>
      <div className="status-item">
        <span className="label">Slot Number:</span>
        <span className="value">#{slotNumber}</span>
      </div>
      <div className="status-item">
        <span className="label">Plate Number:</span>
        <span className="value plate">{plateNumber}</span>
      </div>
      <div className="status-item">
        <span className="label">Rate per Hour:</span>
        <span className="value">₹{ratePerHour}/hr</span>
      </div>
      <div className="status-item">
        <span className="label">Time Parked:</span>
        <span className="value timer">
          <Timer size={18} className="timer-icon" />
          {formatTime(seconds)}
        </span>
      </div>
      <div className="status-item">
        <span className="label">Estimated Cost:</span>
        <span className="value">₹{estimatedCost}</span>
      </div>
    </div>
  );
};

export default ParkingStatus;
