import React from "react";
import "./KpiCard.css";

export default function KpiCard({ title, value, accent = "primary" }) {
  return (
    <div className={`kpi-card kpi-${accent}`}>
      <div className="kpi-accent" />
      <div className="kpi-content">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">{value}</div>
      </div>

      {/* glow layers */}
      <span className="kpi-glow" />
      <span className="kpi-border-glow" />
    </div>
  );
}
