import React from "react";
import "./RevenueChart.css";

export default function RevenueChart() {
  return (
    <div className="billing-card chart-card">
      <div className="card-header">
        <h3>Revenue & Occupancy Trend</h3>
        <span>Today</span>
      </div>

      <div className="chart-placeholder">
        <p>Revenue & Active Vehicles over time</p>
        <span>(Chart will be connected later)</span>
      </div>
    </div>
  );
}
