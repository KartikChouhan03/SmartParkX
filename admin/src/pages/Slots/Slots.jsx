import "./Slots.css";
import SlotCard from "../../components/SlotCard/SlotCard.jsx";

export default function Slots() {
  return (
    <div className="slots-page">
      {/* ===== Header ===== */}
      <div className="slots-header">
        <div>
          <h1 className="slots-title">Parking Slots</h1>
          <p className="slots-subtitle">
            Real-time slot occupancy based on sensor data
          </p>
        </div>

        {/* Summary */}
        <div className="slots-summary">
          <div className="summary-item">
            <span className="summary-label">Total</span>
            <span className="summary-value">120</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Occupied</span>
            <span className="summary-value danger">87</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Available</span>
            <span className="summary-value success">33</span>
          </div>
        </div>
      </div>

      {/* ===== Grid ===== */}
      <div className="slots-grid">
        <SlotCard slotId="A1" status="available" />
        <SlotCard slotId="A2" status="occupied" />
        <SlotCard slotId="A3" status="occupied" />
        <SlotCard slotId="B1" status="issue" />
        <SlotCard slotId="B2" status="available" />
        <SlotCard slotId="B3" status="occupied" />
        <SlotCard slotId="B4" status="available" />
        <SlotCard slotId="B5" status="occupied" />
        <SlotCard slotId="B6" status="issue" />
        <SlotCard slotId="B7" status="available" />
        <SlotCard slotId="B8" status="occupied" />
        <SlotCard slotId="B9" status="issue" />
        <SlotCard slotId="B10" status="available" />
        <SlotCard slotId="B11" status="occupied" />
        <SlotCard slotId="B12" status="issue" />
      </div>
    </div>
  );
}
