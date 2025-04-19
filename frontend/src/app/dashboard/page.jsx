"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [stockData, setStockData] = useState([]);

  const fetchStock = async () => {
    try {
      const res = await fetch(
        "https://api.marketstack.com/v2/eod?access_key=c25a73e642e47450620f63f9b47e59ab&symbols=AAPL,MSFT,TSLA"
      );
      const data = await res.json();
      setStockData(data.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-6 py-8">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Market Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">S&P 500</span>
                <span className="text-green-500">+1.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">NASDAQ</span>
                <span className="text-red-500">-0.8%</span>
              </div>
            </div>
          </div>

          {/* Your Watchlist */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Watchlist
            </h2>
            <div className="space-y-4">
              {stockData.length > 0 ? (
                stockData.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-600">{stock.symbol}</span>
                    <span className="text-green-500">
                      ${stock.close.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">Loading...</div>
              )}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Alerts
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center">
                <i className="fas fa-bell text-blue-500 mr-3"></i>
                <span>TSLA price target reached</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
                <span>Unusual volume detected: AMD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Analysis Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Technical Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Key Indicators
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">RSI</span>
                  <span className="text-blue-600">65.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">MACD</span>
                  <span className="text-green-500">Bullish</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Moving Average (50)</span>
                  <span className="text-blue-600">$145.30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
