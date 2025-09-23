// filename: src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const API_BASE = import.meta.env.VITE_API_BASE;

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Mismatch",
        text: "Passwords do not match ❌",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/auth/reset-password-otp`, {
        email,
        otp,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Password reset successful ✅",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: err.response?.data?.message || "Invalid OTP ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2ec4b6] via-[#2ec4b6] to-[#2ec4b6] px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Reset Your Password
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter OTP from your email and set a new password
          </p>

          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2ec4b6] outline-none"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2ec4b6] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2ec4b6] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2ec4b6] text-white font-semibold rounded-lg shadow-md hover:bg-[#28a99a] transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-[#2ec4b6] hover:underline font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
