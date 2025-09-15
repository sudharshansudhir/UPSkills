import React, { useState } from "react";
import img2 from "../assets/register1.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        role: formData.role,
        password: formData.password,
      };

      const res = await axios.post("http://localhost:5000/api/auth/register", payload);

      // Backend returns message and user.isApproved
      const user = res.data.user;
      const msg = res.data.message || "Registered successfully";

      if (user.role === "instructor") {
        // DO NOT auto-login instructor — show message and redirect to login
        alert(msg || "Registered! Wait for admin approval.");
        navigate("/login");
      } else {
        // student — auto-save token and login
        localStorage.setItem("token", res.data.token);
        alert("Registered & logged in ✅");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 md:px-16 py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 hidden md:block relative">
          <img src={img2} alt="register visual" className="h-full w-full object-cover rounded-l-xl" />
        </div>

        <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-center text-lg font-semibold text-gray-600 mb-2">Welcome to UPSkills..!</h2>

          <div className="flex justify-center gap-4 mb-6">
            <NavLink to="/login" className="px-6 py-2 rounded-full border border-[#2ec4b6] text-[#2ec4b6] font-medium">Login</NavLink>
            <NavLink to="/register" className="px-6 py-2 rounded-full bg-[#2ec4b6] text-white font-medium">Register</NavLink>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded-md" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full px-4 py-2 border rounded-md" />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full px-4 py-2 border rounded-md" />

            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border rounded-md pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative w-full">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className={`w-full px-4 py-2 border rounded-md pr-10 ${formData.confirmPassword ? (formData.confirmPassword === formData.password ? "border-green-500" : "border-red-500") : ""}`} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="w-full py-2 mt-4 rounded-full bg-[#2ec4b6] text-white font-medium hover:bg-[#27b2a6] transition">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
