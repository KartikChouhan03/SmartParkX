import React, { useEffect, useState } from "react";
import "./PendingPayments.css";
import api from "../../lib/adminApi";

export default function PendingPayments() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await api.get("/admin/billing/pending");
      setPending(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (entry, exit) => {
    const ms = new Date(exit) - new Date(entry);
    const mins = Math.floor(ms / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="billing-card pending-card">
      <div className="card-header">
        <h3>Pending Payments</h3>
      </div>

      {pending.length === 0 ? (
        <div className="empty-state">No pending payments</div>
      ) : (
        <ul className="pending-list">
          {pending.map((p) => (
            <li key={p._id}>
              <span>{p.vehicleNumber}</span>
              <span>{formatDuration(p.entryTime, p.exitTime)}</span>
              <span className="amount">₹{p.billAmount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
