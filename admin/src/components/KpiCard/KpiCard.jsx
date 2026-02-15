import React from "react";
import "./KpiCard.css";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  type = "primary", // primary, success, warning, danger
}) {
  // Helper to determine trend color and icon
  const getTrendDetails = () => {
    if (trend === "up")
      return { color: "var(--success)", TrendIcon: ArrowUpRight };
    if (trend === "down")
      return { color: "var(--danger)", TrendIcon: ArrowDownRight };
    return { color: "var(--text-muted)", TrendIcon: Minus };
  };

  const { color: trendColor, TrendIcon } = getTrendDetails();

  return (
    <div className={`kpi-card type-${type}`}>
      <div className={`kpi-accent-border bg-${type}`}></div>

      {/* Decorative Background Icon */}
      {Icon && <Icon className="kpi-bg-icon" size={120} strokeWidth={1} />}

      {/* Top Row: Title & Icon */}
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className={`kpi-icon-box bg-${type}`}>
          {Icon && <Icon size={20} className={`icon-${type}`} />}
        </div>
      </div>

      {/* Middle: Big Value */}
      <div className="kpi-value">{value}</div>

      {/* Bottom: Trend / Footer */}
      {trendValue && (
        <div className="kpi-footer">
          <span className="trend-badge" style={{ color: trendColor }}>
            <TrendIcon size={14} />
            {trendValue}
          </span>
          <span className="trend-label">vs last 24h</span>
        </div>
      )}
    </div>
  );
}
