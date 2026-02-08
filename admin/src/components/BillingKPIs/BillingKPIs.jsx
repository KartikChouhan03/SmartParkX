import React from "react";
import "./BillingKPIs.css";

export default function BillingKPIs() {
  return (
    <div className="billing-kpis">
      <div className="kpi-card kpi-primary">
        <span className="kpi-label">Today's Revenue</span>
        <h3>₹12,450</h3>
        <p>Collected today</p>
      </div>

      <div className="kpi-card kpi-warning">
        <span className="kpi-label">Active Vehicles</span>
        <h3>14</h3>
        <p>Currently parked</p>
      </div>

      <div className="kpi-card kpi-danger">
        <span className="kpi-label">Pending Payments</span>
        <h3>3</h3>
        <p>Exit blocked</p>
      </div>

      <div className="kpi-card kpi-success">
        <span className="kpi-label">Avg Duration</span>
        <h3>1h 42m</h3>
        <p>Today's average</p>
      </div>
    </div>
  );
}
