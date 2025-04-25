"use client";
import React, { useEffect, useState } from "react";
import useUserStore from "./store/useUserStore";
import Home from "./components/Home";
import StockCard from "./components/StockCard";

const Page = () => {
  const { initializeFromStorage } = useUserStore();
  const [stocks, setStocks] = useState([]);
  const apiKey = "2d5b576dde3d4556919f3fb16dbb17ce"; 
  const symbols = ["AAPL", "MSFT", "GOOG", "AMZN"];

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  useEffect(() => {
    const fetchStockData = async (symbol) => {
      const [priceRes, chartRes] = await Promise.all([
        fetch(
          `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`
        ),
        fetch(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1month&outputsize=60&apikey=${apiKey}`
        ),
      ]);

      const priceData = await priceRes.json();
      const chartData = await chartRes.json();

      return {
        symbol: priceData.symbol,
        name: priceData.name,
        price: priceData.price,
        change: priceData.change,
        percent: priceData.percent_change,
        exchange: priceData.exchange,
        currency: priceData.currency,
        fiftyTwoWeek: {
          high: priceData.fifty_two_week.high,
          low: priceData.fifty_two_week.low,
        },
        chart:
          chartData?.values?.reverse().map((item) => ({
            datetime: item.datetime,
            close: parseFloat(item.close),
          })) || [],
      };
    };

    const fetchAll = async () => {
      const data = await Promise.all(symbols.map((s) => fetchStockData(s)));
      setStocks(data);
    };

    fetchAll();
  }, []);

  return (
    <>
      <Home />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📈 5-Year Stock Overview
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                percent={stock.percent}
                exchange={stock.exchange}
                currency={stock.currency}
                fiftyTwoWeek={stock.fiftyTwoWeek}
                data={stock.chart}
              />
            ))
          ) : (
            <p className="col-span-full text-center">Loading stocks...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
