import React from "react";

const StockCard = ({ symbol, price, change, percent }) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-64 border">
      <h2 className="text-xl font-bold text-gray-800">{symbol}</h2>
      <p className="text-3xl font-semibold mt-2 text-blue-600">${price}</p>
      <p className={`mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "▲" : "▼"} {change} ({percent}%)
      </p>
    </div>
  );
};

export default StockCard;
