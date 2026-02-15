import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Chart.css";

const data = [
  { time: "09:00", revenue: 1200, active: 6 },
  { time: "10:00", revenue: 2400, active: 9 },
  { time: "11:00", revenue: 3800, active: 14 },
  { time: "12:00", revenue: 5200, active: 17 },
  { time: "13:00", revenue: 7400, active: 20 },
];

export default function Chart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue & Occupancy Trend</h3>
        <span>Today</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-default)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-muted)",
              boxShadow: "var(--shadow-md)",
              color: "var(--text-primary)",
            }}
            itemStyle={{ fontSize: 13 }}
            labelStyle={{
              color: "var(--text-secondary)",
              marginBottom: 4,
              fontSize: 12,
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--primary)",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />

          <Line
            type="monotone"
            dataKey="active"
            stroke="var(--success)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--success)",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
