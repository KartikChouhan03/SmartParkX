import React from "react";
import "./Billing.css";

import BillingKPIs from "../../components/BillingKPIs/BillingKPIs.jsx";
import RevenueChart from "../../components/RevenueChart/RevenueChart.jsx";
import PendingPayments from "../../components/PendingPayments/PendingPayments.jsx";
import BillingTable from "../../components/BillingTable/BillingTable.jsx";

export default function BillingPage() {
  return (
    <div className="billing-page">
      {/* Page Header */}
      <div className="billing-header">
        <h1>Billing</h1>
        <p>Revenue, payments, and active vehicle billing status</p>
      </div>

      {/* KPI Cards */}
      <BillingKPIs />

      {/* Analytics Row */}
      <div className="billing-analytics">
        <RevenueChart />
        <PendingPayments />
      </div>

      {/* Billing Records */}
      <BillingTable />
    </div>
  );
}
