// UserProfile.jsx
import React, { useState, useEffect } from "react";
import lina from "../assets/lina.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

  const API_BASE = import.meta.env.VITE_API_BASE;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const UserProfile = ({ role = "student" }) => {
  const [user, setUser] = useState(null);
  const [draftUser, setDraftUser] = useState({});
  const [badges, setBadges] = useState([]);
  const [newBadge, setNewBadge] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = res.data || {};

        setUser({
          ...fetchedUser,
          phone: fetchedUser.phone || "",
          dob: fetchedUser.dob || "",
          address: fetchedUser.address || "",
          badges: fetchedUser.badges || [],
          enrolledCourses: fetchedUser.enrolledCourses || 0,
        });

        setDraftUser({
          ...fetchedUser,
          phone: fetchedUser.phone || "",
          dob: fetchedUser.dob || "",
          address: fetchedUser.address || "",
          badges: fetchedUser.badges || [],
          enrolledCourses: fetchedUser.enrolledCourses || 0,
        });

        setBadges(fetchedUser.badges || []);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Failed to load profile ❌");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500">Loading profile...</p>
    );
  if (!user)
    return <p className="text-center mt-20 text-red-500">User not found!</p>;

  // Sample Analytics Data
  const performanceData = [
    { subject: "AWS", score: 85 },
    { subject: "React", score: 92 },
    { subject: "Python", score: 76 },
    { subject: "UI/UX", score: 88 },
    { subject: "DevOps", score: 70 },
  ];

  const activityData = [
    { month: "Jan", hours: 15 },
    { month: "Feb", hours: 18 },
    { month: "Mar", hours: 12 },
    { month: "Apr", hours: 22 },
    { month: "May", hours: 25 },
    { month: "Jun", hours: 19 },
  ];

  // Handlers
  const handleChange = (e) =>
    setDraftUser({ ...draftUser, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedUser = { ...draftUser, badges };

      const res = await axios.put(
        `${API_BASE}/api/auth/me`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data || {};
      setUser(updated);
      setDraftUser(updated);
      setBadges(updated.badges || []);
      setEditMode(false);
      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out 🚪");
    navigate("/login");
  };

  const handleAddBadge = () => {
    if (newBadge.trim() !== "") {
      setBadges([...badges, newBadge]);
      setNewBadge("");
    }
  };

  const handleRemoveBadge = (index) => {
    setBadges(badges.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl mt-10 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">
          Student Profile{" "}
          <span className="text-[#2ec4b6]">({user.role || role})</span>
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src={lina}
            alt="Profile"
            className="rounded-full mb-3 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover shadow-lg border-4 border-[#2ec4b6]/40"
          />
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
            {user.name || "No Name"}
          </p>
          <p className="text-gray-500 text-sm">UPSkills Student</p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-inner">
          <InputField
            label="Name"
            name="name"
            value={draftUser.name || ""}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Name"
          />
          <InputField
            label="Email"
            name="email"
            value={draftUser.email || ""}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Email"
          />
          <InputField
            label="Phone"
            name="phone"
            value={draftUser.phone || ""}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Phone Number"
          />
          <InputField
            label="Date of Birth"
            name="dob"
            value={draftUser.dob || ""}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your DOB"
          />
          <InputField
            label="Address"
            name="address"
            value={draftUser.address || ""}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Address"
          />
        </div>

        {/* Enrolled Info */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 border rounded-lg bg-gradient-to-r from-[#f3f9ff] to-[#fff] shadow text-center">
          <p className="text-base sm:text-lg font-medium">
            📚 Enrolled in{" "}
            <span className="text-[#2ec4b6]">{user.enrolledCourses || 0}</span>{" "}
            Courses
          </p>
        </div>

        {/* Badges */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-700">
            🏅 Achievements & Badges
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {badges.length > 0 ? (
              badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2ec4b6]/10 text-[#2ec4b6] text-sm sm:text-base font-semibold rounded-full shadow-sm"
                >
                  {badge}
                  {editMode && (
                    <button
                      onClick={() => handleRemoveBadge(idx)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No badges earned yet</p>
            )}
          </div>

          {editMode && (
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add new badge"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="flex-1 border px-3 py-2 rounded focus:ring-2 focus:ring-[#2ec4b6]"
              />
              <button
                onClick={handleAddBadge}
                className="bg-green-500 text-white px-4 sm:px-5 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="mt-10 sm:mt-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-gray-700 text-center">
            📊 Student Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Performance Chart */}
            <div className="p-4 sm:p-6 bg-white shadow rounded-xl border">
              <h4 className="text-base sm:text-lg font-semibold mb-4">
                Performance by Subject
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2ec4b6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Learning Activity */}
            <div className="p-4 sm:p-6 bg-white shadow rounded-xl border">
              <h4 className="text-base sm:text-lg font-semibold mb-4">
                Monthly Study Hours
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#16c9c6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Radar */}
            <div className="md:col-span-2 p-4 sm:p-6 bg-white shadow rounded-xl border">
              <h4 className="text-base sm:text-lg font-semibold mb-4">
                Skill Radar
              </h4>
              <ResponsiveContainer width="100%" height={300} minHeight={250}>
                <RadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Student"
                    dataKey="score"
                    stroke="#2ec4b6"
                    fill="#2ec4b6"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex gap-2 sm:gap-3 flex-wrap justify-center">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 sm:px-5 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition text-sm sm:text-base"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 sm:px-5 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition text-sm sm:text-base"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 sm:px-5 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition text-sm sm:text-base"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="px-4 sm:px-5 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition text-sm sm:text-base"
          >
            ⬅ Back to Homepage
          </button>
          <button
            onClick={handleLogout}
            className="px-4 sm:px-5 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm sm:text-base"
          >
            🚪 Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Input Field Component
const InputField = ({ label, name, value, onChange, editMode, placeholder }) => (
  <div>
    <label className="block text-gray-600 mb-1 font-medium text-sm sm:text-base">
      {label}
    </label>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border rounded w-full focus:ring-2 focus:ring-[#2ec4b6] text-sm sm:text-base"
      />
    ) : (
      <p
        className={`px-3 py-2 border rounded bg-gray-50 shadow-inner text-sm sm:text-base ${
          !value ? "text-gray-400 italic" : ""
        }`}
      >
        {value || placeholder}
      </p>
    )}
  </div>
);

export default UserProfile;
