"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOG", "AMZN"];

const Page = () => {
  const [latestData, setLatestData] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState("");

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
        <Link
          href={`/stocks/${searchSymbol.toUpperCase()}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </Link>
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
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Chart
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
