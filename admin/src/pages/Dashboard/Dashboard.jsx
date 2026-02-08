import React from "react";
import "./Dashboard.css";
import KpiCard from "../../components/KpiCard/KpiCard";
import SystemStatus from "../../components/SystemStatus/SystemStatus";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import SystemAlerts from "../../components/SystemAlerts/SystemAlerts";

const Dashboard = () => {
  return (
    <>
      <div className="kpi-grid">
        <KpiCard title="Total Slots" value="120" accent="primary" />
        <KpiCard title="Occupied" value="87" accent="warning" />
        <KpiCard title="Available" value="33" accent="success" />
        <KpiCard title="Today's Revenue" value="₹12,450" accent="danger" />
      </div>
      <div className="dashboard-lower">
        <RecentActivity />
        <div className="dashboard-right-column">
          <SystemStatus />
          <SystemAlerts />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
