"use client";
import React, { useEffect, useState } from "react";
import useUserStore from "./store/useUserStore";
import Home from "./components/Home";
import StockCard from "./components/StockCard";

const page = () => {
  const { initializeFromStorage } = useUserStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const [stock, setStock] = useState(null);
  const apiKey = "2d5b576dde3d4556919f3fb16dbb17ce";
  const symbol = "AAPL";

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await res.json();
        setStock(data);
      } catch (err) {
        console.error("Error fetching stock data", err);
      }
    };

    fetchStockData();
  }, []);

  return (
    <>
      <Home />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        {stock ? (
          <StockCard
            symbol={stock.symbol}
            price={stock.price}
            change={stock.change}
            percent={stock.percent_change}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default page;
