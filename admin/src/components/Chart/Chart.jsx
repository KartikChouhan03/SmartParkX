import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Chart.css";
import React, { useEffect, useState } from "react";
import api from "../../lib/adminApi";

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const res = await api.get("/admin/billing/revenue-chart");

      const formatted = res.data.map((item) => ({
        date: item._id,
        revenue: item.total,
      }));

      setData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue Trend (Last 7 Days)</h3>
        <span>7 Days</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border-muted)"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "8px",
              border: "1px solid var(--border-muted)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: "var(--text-primary)",
            }}
            itemStyle={{ color: "var(--primary)" }}
            formatter={(value) => [`₹${value}`, "Revenue"]}
            labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
            cursor={{ stroke: "var(--border-muted)", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            activeDot={{ r: 6, strokeWidth: 0, fill: "var(--primary)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
