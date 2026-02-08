import React from "react";
import "./BillingTable.css";

export default function BillingTable() {
  return (
    <div className="billing-card">
      <div className="card-header">
        <h3>Billing Records</h3>
      </div>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Plate</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Duration</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>MH12AB1234</td>
            <td>10:12 AM</td>
            <td>—</td>
            <td>2h 15m</td>
            <td>₹120</td>
            <td>
              <span className="status pending">Pending</span>
            </td>
            <td>
              <button className="mark-paid">Mark Paid</button>
            </td>
          </tr>

          <tr>
            <td>KA01XY7788</td>
            <td>09:00 AM</td>
            <td>11:10 AM</td>
            <td>2h 10m</td>
            <td>₹140</td>
            <td>
              <span className="status paid">Paid</span>
            </td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
