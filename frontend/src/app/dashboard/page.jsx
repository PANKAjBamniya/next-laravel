"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOG", "AMZN"];

const Page = () => {
  const [latestData, setLatestData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDetails, setStockDetails] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [searchSymbol, setSearchSymbol] = useState("");

  // 1. Fetch latest prices for default stock list
  const fetchLatestPrices = async () => {
    try {
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        const res = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=98f05b4375aa3d603d2a97b866015316&symbols=${symbol}&limit=1`
        );
        const data = await res.json();
        return {
          symbol,
          close: data.data[0]?.close,
          date: data.data[0]?.date.split("T")[0],
        };
      });
      const results = await Promise.all(promises);
      setLatestData(results);
    } catch (err) {
      console.error("Error fetching latest prices:", err);
    }
  };

  // 2. Fetch chart data (either from table or search)
  const fetchStockChart = async (symbol, years = 5) => {
    setLoadingChart(true);
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - years);
    const formattedStart = startDate.toISOString().split("T")[0];

    try {
      const res = await fetch(
        `https://api.marketstack.com/v1/eod?access_key=5dd2e3474236439863830bd1c0f2620d&symbols=${symbol}&date_from=${formattedStart}&date_to=${endDate}&limit=1000`
      );
      const data = await res.json();
      if (!data.data || data.data.length === 0) {
        alert("No data found for this symbol");
        setStockDetails([]);
        setSelectedStock(null);
        setLoadingChart(false);
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
      setSelectedStock(symbol.toUpperCase());
    } catch (err) {
      console.error("Error fetching stock chart:", err);
    }
    setLoadingChart(false);
  };

  useEffect(() => {
    fetchLatestPrices();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">📋 Stock Watchlist</h1>

      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          placeholder="Search stock (e.g., TSLA)"
          className="border px-4 py-2 rounded-md mr-2"
        />
        <button
          onClick={() => fetchStockChart(searchSymbol)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* 📊 Table of Stocks */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="py-3 px-4">Symbol</th>
              <th className="py-3 px-4">Latest Close</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {latestData.map((stock) => (
              <tr
                key={stock.symbol}
                className="border-t text-sm text-gray-700 hover:bg-gray-50"
              >
                <td className="py-2 px-4 font-semibold">{stock.symbol}</td>
                <td className="py-2 px-4">${stock.close?.toFixed(2)}</td>
                <td className="py-2 px-4">{stock.date}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      selectedStock === stock.symbol
                        ? setSelectedStock(null)
                        : fetchStockChart(stock.symbol)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {selectedStock === stock.symbol
                      ? "Hide Chart"
                      : "View Chart"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📈 Chart */}
      {selectedStock && stockDetails.length > 0 && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            📊 {selectedStock} Stock Chart (Last 5 Years)
          </h2>
          {loadingChart ? (
            <div className="text-gray-500">Loading chart...</div>
          ) : (
            <>
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

              {/* Latest Stock Info */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                {(() => {
                  const latest = stockDetails[stockDetails.length - 1];
                  return (
                    <>
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
                    </>
                  );
                })()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
