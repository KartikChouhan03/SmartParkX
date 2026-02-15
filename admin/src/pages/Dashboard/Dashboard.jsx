import React from "react";
import "./Dashboard.css";
import KpiCard from "../../components/KpiCard/KpiCard";
import SystemStatus from "../../components/SystemStatus/SystemStatus";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import SystemAlerts from "../../components/SystemAlerts/SystemAlerts";
import QuickAction from "../../components/QuickAction/QuickAction";
import { Car, CheckCircle, AlertCircle, IndianRupee } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <QuickAction />

      <div className="kpi-grid">
        <KpiCard
          title="Total Slots"
          value="120"
          type="primary"
          icon={Car}
          trend="up"
          trendValue="12%"
        />
        <KpiCard
          title="Occupied"
          value="87"
          type="warning"
          icon={AlertCircle}
          trend="up"
          trendValue="5%"
        />
        <KpiCard
          title="Available"
          value="33"
          type="success"
          icon={CheckCircle}
          trend="down"
          trendValue="2%"
        />
        <KpiCard
          title="Today's Revenue"
          value="₹12,450"
          type="danger"
          icon={IndianRupee}
          trend="up"
          trendValue="8%"
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
