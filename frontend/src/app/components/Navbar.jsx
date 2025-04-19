"use client";

import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import useUserStore from "../store/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href="/">
          Stock-<span className="text-[#7338B6]">Mart</span>
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-white bg-[#7338B6] rounded hover:bg-[#622ea0] transition"
            >
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="text-[#7338B6] text-2xl hover:text-[#622ea0] transition"
              title={user?.name}
            >
              <FaUserCircle />
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-[#7338B6] hover:text-white border border-[#7338B6] rounded hover:bg-[#7338B6] transition"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[#7338B6] hover:text-white border border-[#7338B6] rounded hover:bg-[#7338B6] transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
