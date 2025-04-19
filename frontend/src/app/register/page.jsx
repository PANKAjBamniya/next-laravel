"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation
import useUserStore from "../store/useUserStore";

const Register = () => {
  const { register } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const router = useRouter(); // Create the router instance

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      router.push("/");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg mt-10"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Register
      </h2>

      {/* Name Input */}
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Input */}
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirm Password Input */}
      <div>
        <input
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
