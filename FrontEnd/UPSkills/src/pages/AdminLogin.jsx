import React, { useState } from "react";
import logo from "../../src/assets/UPSkills-logo (3).png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👈 Import icons
import Footer from '../components/Footer';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!adminId.trim()) newErrors.adminId = "Admin ID is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// import axios from "axios";

const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError("");
  if (!validateForm()) return;

  try {
    const res = await axios.post("http://localhost:5000/api/admin/admin-login", {
      adminId,
      password,
    });

    if (res.data.token) {
      console.log("Admin login success:", res.data);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.user.name); // use name
      localStorage.setItem("adminId", res.data.user.id);     // save id if needed
      localStorage.setItem("adminRole", res.data.user.role); // save role
      navigate("/admindashboard");
    }
  } catch (err) {
    setLoginError("❌ Invalid admin credentials");
    console.error("Admin login error:", err.response?.data || err.message);
  }
};



  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="absolute top-8 left-8">
          <img src={logo} alt="UPSkills Logo" className="h-30 w-auto" />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-10">
          Welcome, Log into your account
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-sm text-gray-600 mb-6">It is our great pleasure to have you on board!</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <input
                type="text"
                placeholder="Enter the admin ID"
                className="w-full px-4 py-2 border rounded-md"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
              {errors.adminId && <p className="text-red-500 text-sm mt-1">{errors.adminId}</p>}
            </div>

            {/* Password with Eye toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-md pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {loginError && <p className="text-red-500 text-center">{loginError}</p>}

            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md">
              Login
            </button>
          </form>

          <button onClick={() => navigate("/")} className="w-full mt-4 bg-gray-400 text-white py-2 rounded-md">
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
