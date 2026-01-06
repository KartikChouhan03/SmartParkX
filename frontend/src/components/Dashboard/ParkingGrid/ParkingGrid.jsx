import React from "react";
import "./ParkingGrid.css";
import { Timer } from "lucide-react";
import { useStore } from "../../../Context/StoreContext";

const ParkingGrid = () => {
  const { slots, loading } = useStore();

  if (loading) {
    return <p>Loading parking slots...</p>;
  }

  const total = slots.length;
  const occupied = slots.filter((s) => s.isOccupied).length;
  const unoccupied = total - occupied;

  return (
    <div className="parking-container">
      <h2 className="parking-title">SmartParkX Parking Status</h2>

      {/* Stats */}
      <div className="parking-stats">
        <span>Total Slots: {total}</span>
        <span className="occupied">Occupied: {occupied}</span>
        <span className="free">Available: {unoccupied}</span>
      </div>

      {/* Grid */}
      <div className="parking-grid">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className={`parking-slot ${
              slot.isOccupied ? "occupied-slot" : "free-slot"
            }`}
          >
            <p>Slot {slot.slotNumber}</p>
            <p>{slot.isOccupied ? "Occupied" : "Available"}</p>

            {slot.isOccupied && (
              <div className="timer">
                <Timer size={16} />
                <span>Active</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingGrid;
