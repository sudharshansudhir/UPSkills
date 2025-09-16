import React, { useState } from "react";
import img1 from "../assets/login1.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

  const API_BASE = import.meta.env.VITE_API_BASE;
const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your registered email ❌");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
        email,
      });

      alert(res.data.message || "Password reset link sent ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-8 md:px-16 py-6 sm:py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={img1}
            alt="forgot visual"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-center text-base sm:text-lg font-semibold text-gray-600 mb-2">
            Forgot Password 🔑
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6">
            <NavLink
              to="/login"
              className="px-4 sm:px-6 py-2 rounded-full border border-[#2ec4b6] text-[#2ec4b6] text-sm sm:text-base font-medium"
            >
              Back to Login
            </NavLink>
          </div>

          {/* Forgot Form */}
          <form className="space-y-5" onSubmit={handleForgot}>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2ec4b6] text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-3 mt-4 rounded-full bg-[#2ec4b6] text-white font-medium text-sm sm:text-base hover:bg-[#27b2a6] transition"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
