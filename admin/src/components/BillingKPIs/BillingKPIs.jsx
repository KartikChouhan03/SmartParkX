import React, { useEffect, useState } from "react";
import "./BillingKPIs.css";
import api from "../../lib/adminApi";

export default function BillingKPIs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const res = await api.get("/admin/billing/kpis");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return null;

  return (
    <div className="billing-kpis">
      <div className="kpi-card kpi-primary">
        <span className="kpi-label">Today's Revenue</span>
        <h3>₹{data.revenueToday}</h3>
        <p>Collected today</p>
      </div>

      <div className="kpi-card kpi-warning">
        <span className="kpi-label">Active Vehicles</span>
        <h3>{data.activeVehicles}</h3>
        <p>Currently parked</p>
      </div>

      <div className="kpi-card kpi-danger">
        <span className="kpi-label">Pending Payments</span>
        <h3>{data.pendingPayments}</h3>
        <p>Exit blocked</p>
      </div>

      <div className="kpi-card kpi-success">
        <span className="kpi-label">Avg Duration</span>
        <h3>{data.avgDuration}</h3>
        <p>Today's average</p>
      </div>
    </div>
  );
}
