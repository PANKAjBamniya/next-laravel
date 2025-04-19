import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            © 2023 StockAnalytics Pro. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition">
              Terms
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
