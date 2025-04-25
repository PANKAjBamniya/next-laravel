"use client";
import React, { useEffect } from "react";
import useUserStore from "./store/useUserStore";

const Home = () => {
  const { initializeFromStorage } = useUserStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Track Your <span className="text-[#7338B6]">Stocks</span> in
            Real-Time
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Stay ahead in the market with live stock updates, smart insights,
            and your own customizable dashboard.
          </p>
          <button className="mt-6 px-6 py-3 bg-[#7338B6] text-white rounded-lg hover:bg-purpal transition">
            Get Started
          </button>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1">
          <img
            src="https://i.pinimg.com/736x/59/8b/e8/598be8d25a1365aa5fb743d5b25c4617.jpg"
            alt="Stock Market"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
