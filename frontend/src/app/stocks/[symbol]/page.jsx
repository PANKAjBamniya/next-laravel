"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StockPage = () => {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockChart = async () => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 5);
    const formattedStart = startDate.toISOString().split("T")[0];

    try {
      const res = await fetch(
        `https://api.marketstack.com/v1/eod?access_key=5dd2e3474236439863830bd1c0f2620d&symbols=${symbol}&date_from=${formattedStart}&date_to=${endDate}&limit=1000`
      );
      const data = await res.json();
      if (!data.data || data.data.length === 0) {
        alert("No data found for this symbol");
        setStockDetails([]);
        setLoading(false);
        return;
      }

      const formatted = data.data.map((item) => ({
        date: item.date.split("T")[0],
        open: item.open,
        close: item.close,
        high: item.high,
        low: item.low,
      }));
      setStockDetails(formatted.reverse());
    } catch (err) {
      console.error("Error fetching stock chart:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStockChart();
  }, [symbol]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (stockDetails.length === 0)
    return <div className="p-10">No Data Found for {symbol}</div>;

  const latest = stockDetails[stockDetails.length - 1];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">
        📈 {symbol.toUpperCase()} Stock Chart
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stockDetails}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3B82F6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <div>
          <strong>Date:</strong> {latest.date}
        </div>
        <div>
          <strong>Open:</strong> ${latest.open}
        </div>
        <div>
          <strong>High:</strong> ${latest.high}
        </div>
        <div>
          <strong>Low:</strong> ${latest.low}
        </div>
        <div>
          <strong>Close:</strong> ${latest.close}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
