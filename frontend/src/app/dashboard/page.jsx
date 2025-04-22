"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Watchlist
            </h2>
            <div className="space-y-4">
              {stockData?.length > 0 ? (
                stockData.map((stock) => (
                  <div
                    key={stock.symbol + stock.date}
                    className="border-b pb-4 mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{stock.symbol}</span>
                      <span className="text-green-500">
                        ${stock.close.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="mt-2 text-sm text-blue-500 hover:underline"
                      onClick={() =>
                        setSelectedStock(
                          selectedStock?.symbol === stock.symbol ? null : stock
                        )
                      }
                    >
                      {selectedStock?.symbol === stock.symbol
                        ? "Hide Details"
                        : "View Details"}
                    </button>

                    {/* Show details if selected */}
                    {selectedStock?.symbol === stock.symbol && (
                      <div className="mt-3 text-sm text-gray-700 space-y-1">
                        <div>Open: ${stock.open}</div>
                        <div>High: ${stock.high}</div>
                        <div>Low: ${stock.low}</div>
                        <div>Date: {stock.date.split("T")[0]}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
