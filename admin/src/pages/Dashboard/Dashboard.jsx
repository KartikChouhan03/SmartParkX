import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import KpiCard from "../../components/KpiCard/KpiCard";
import SystemStatus from "../../components/SystemStatus/SystemStatus";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import SystemAlerts from "../../components/SystemAlerts/SystemAlerts";
import QuickAction from "../../components/QuickAction/QuickAction";
import { Car, CheckCircle, AlertCircle, IndianRupee } from "lucide-react";
import api from "../../lib/adminApi";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const res = await api.get("/admin/dashboard/kpis");
      setKpis(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !kpis) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <QuickAction />

      <div className="kpi-grid">
        <KpiCard
          title="Total Slots"
          value={kpis.totalSlots}
          type="primary"
          icon={Car}
        />

        <KpiCard
          title="Occupied"
          value={kpis.occupiedSlots}
          type="warning"
          icon={AlertCircle}
          trend={kpis.sessions.trend.direction}
          trendValue={`${kpis.sessions.trend.percentage}%`}
        />

        <KpiCard
          title="Available"
          value={kpis.availableSlots}
          type="success"
          icon={CheckCircle}
        />

        <KpiCard
          title="Today's Revenue"
          value={`₹${kpis.revenue.value}`}
          type="danger"
          icon={IndianRupee}
          trend={kpis.revenue.trend.direction}
          trendValue={`${kpis.revenue.trend.percentage}%`}
        />
      </div>

      <div className="dashboard-lower">
        <RecentActivity />
        <div className="dashboard-right-column">
          <SystemStatus />
          <SystemAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
