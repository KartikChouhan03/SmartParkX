import React, { useEffect, useState } from "react";
import "./BillingTable.css";
import api from "../../lib/adminApi"; 

export default function BillingTable() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/admin/billing/records");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markPaid = async (id) => {
    try {
      await api.patch(`/admin/billing/${id}/mark-paid`);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (entry, exit) => {
    if (!exit) return "--";
    const ms = new Date(exit) - new Date(entry);
    const mins = Math.floor(ms / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

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
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.vehicleNumber}</td>
              <td>{new Date(r.entryTime).toLocaleString()}</td>
              <td>
                {r.exitTime ? new Date(r.exitTime).toLocaleString() : "--"}
              </td>
              <td>{formatDuration(r.entryTime, r.exitTime)}</td>
              <td>₹{r.billAmount}</td>
              <td>
                <span
                  className={`status ${
                    r.paymentStatus === "PAID" ? "paid" : "pending"
                  }`}
                >
                  {r.paymentStatus}
                </span>
              </td>
              <td>
                {r.paymentStatus === "PENDING" ? (
                  <button className="mark-paid" onClick={() => markPaid(r._id)}>
                    Mark Paid
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
