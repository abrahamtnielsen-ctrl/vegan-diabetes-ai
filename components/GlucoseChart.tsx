"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { day: "Mon", glucose: 118 },
  { day: "Tue", glucose: 125 },
  { day: "Wed", glucose: 112 },
  { day: "Thu", glucose: 135 },
  { day: "Fri", glucose: 122 },
  { day: "Sat", glucose: 108 },
  { day: "Sun", glucose: 130 },
];

export default function GlucoseChart() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 16, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[90, 160]}
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            unit=" mg"
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
            formatter={(value) => [String(value) + " mg/dL", "Glucose"]}
          />
          <ReferenceLine
            y={120}
            stroke="#10b981"
            strokeDasharray="4 4"
            label={{ value: "Target 120", position: "insideTopRight", fontSize: 10, fill: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="glucose"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
