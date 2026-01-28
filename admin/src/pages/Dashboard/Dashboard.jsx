import React from "react";
import "./Dashboard.css";
import KpiCard from "../../components/KpiCard/KpiCard";

const Dashboard = () => {
  return (
    <>
      <div className="kpi-grid">
        <KpiCard title="Total Slots" value="120" accent="primary" />
        <KpiCard title="Occupied" value="87" accent="warning" />
        <KpiCard title="Available" value="33" accent="success" />
        <KpiCard title="Today's Revenue" value="₹12,450" accent="danger" />
      </div>
    </>
  );
};

export default Dashboard;
