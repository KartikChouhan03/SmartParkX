import React, { useState } from "react";
import "./ParkingGrid.css";
import {Timer} from 'lucide-react';

const ParkingGrid = () => {
  // Example slot data
  const [slots] = useState([
    { id: 1, occupied: true, time: "1h 20m" },
    { id: 2, occupied: false, time: null },
    { id: 3, occupied: true, time: "45m" },
    { id: 4, occupied: false, time: null },
    { id: 5, occupied: true, time: "2h 10m" },
    { id: 6, occupied: false, time: null },
    { id: 7, occupied: true, time: "30m" },
    { id: 8, occupied: false, time: null },
  ]);

  const total = slots.length;
  const occupied = slots.filter((s) => s.occupied).length;
  const unoccupied = total - occupied;

  return (
    <div className="parking-container">
      <h2 className="parking-title">Parking Simulation</h2>

      {/* Stats */}
      <div className="parking-stats">
        <span>Total Slots: {total}</span>
        <span className="occupied">Occupied: {occupied}</span>
        <span className="free">Unoccupied: {unoccupied}</span>
      </div>

      {/* Grid */}
      <div className="parking-grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`parking-slot ${slot.occupied ? "occupied-slot" : "free-slot"}`}
          >
            <p>Slot {slot.id}</p>
            <p>{slot.occupied ? "occupied" : "Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingGrid;
