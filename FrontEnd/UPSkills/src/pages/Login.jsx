import React, { useState } from 'react';
import img1 from '../assets/login1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      // Static Admin
      if (email === "testadmin1" && password === "admin@upskills") {
        const res = await axios.post("http://localhost:5000/api/admin/login", {
          adminId: email,
          password,
        });

        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminName", res.data.admin?.id || "Site Admin");
        localStorage.setItem("adminRole", "admin");

        alert("Admin Login Successful ✅");
        navigate("/admindashboard");
        return;
      }

      // Normal Users
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      if (res.data.user.role === "student") navigate("/");
      else if (res.data.user.role === "instructor") navigate("/instructor-dashboard");
      else if (res.data.user.role === "admin") {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminName", res.data.user.name);
        localStorage.setItem("adminRole", res.data.user.role);
        navigate("/admindashboard");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert("Your Instructor account is not approved yet ❌");
      } else {
        alert(err.response?.data?.message || "Login failed ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-8 md:px-16 py-6 sm:py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={img1}
            alt="login visual"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-center text-base sm:text-lg font-semibold text-gray-600 mb-2">
            Welcome to UPSkills..!
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6">
            <NavLink
              to="/login"
              className="px-4 sm:px-6 py-2 rounded-full bg-[#2ec4b6] text-white text-sm sm:text-base font-medium"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 sm:px-6 py-2 rounded-full border border-[#2ec4b6] text-[#2ec4b6] text-sm sm:text-base font-medium"
            >
              Register
            </NavLink>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email or admin id"
                className="w-full mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2ec4b6] text-sm sm:text-base"
              />
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2ec4b6] text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

<div className="text-right mt-2">
  <NavLink
    to="/forgotpassword"
    className="text-sm text-[#2ec4b6] hover:underline"
  >
    Forgot Password?
  </NavLink>
</div>
            <button
              type="submit"
              className="w-full py-2 sm:py-3 mt-4 rounded-full bg-[#2ec4b6] text-white font-medium text-sm sm:text-base hover:bg-[#27b2a6] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
