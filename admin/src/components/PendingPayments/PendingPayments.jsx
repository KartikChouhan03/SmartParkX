import React from "react";
import "./PendingPayments.css";

export default function PendingPayments() {
  return (
    <div className="billing-card pending-card">
      <div className="card-header">
        <h3>Pending Payments</h3>
      </div>

      <ul className="pending-list">
        <li>
          <span>MH12AB1234</span>
          <span>2h 15m</span>
          <span className="amount">₹120</span>
        </li>

        <li>
          <span>KA05EF4321</span>
          <span>2h 45m</span>
          <span className="amount">₹160</span>
        </li>

        <li>
          <span>DL01CD5678</span>
          <span>1h 55m</span>
          <span className="amount">₹100</span>
        </li>
      </ul>
    </div>
  );
}
