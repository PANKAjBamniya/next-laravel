import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StockChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="datetime" hide />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />
      <Line type="monotone" dataKey="close" stroke="#0ea5e9" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default StockChart;
