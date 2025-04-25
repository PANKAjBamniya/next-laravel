import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StockCard = ({
  symbol,
  price,
  data,
  change,
  percent,
  name,
  exchange,
  currency,
  fiftyTwoWeek,
}) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {name} ({symbol})
          </h2>
          <p className="text-gray-500 text-sm">
            {exchange} | {currency}
          </p>
        </div>
        <div
          className={`text-right ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          <p className="text-xl font-semibold">${price}</p>
          <p className="text-sm">
            {isPositive ? "▲" : "▼"} {change} ({percent}%)
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>
          52W High: <span className="font-medium">${fiftyTwoWeek.high}</span>
        </p>
        <p>
          52W Low: <span className="font-medium">${fiftyTwoWeek.low}</span>
        </p>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="datetime" hide />
            <YAxis domain={["dataMin", "dataMax"]} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockCard;
