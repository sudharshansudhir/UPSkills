import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/UPSkills-logo (3).png";
import lina from "../assets/lina.png";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

const Instructornavbar = () => {
  const [profile, setProfile] = useState({ name: "Instructor", profileImage: lina });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.role === "instructor") {
          const user = res.data;
          setProfile({
            name: user.name || "Instructor",
            profileImage: user.profileImage || lina,
          });
          localStorage.setItem("userProfile", JSON.stringify(user));
        } else {
          handleLogout();
        }
      } catch (err) {
        console.error("Instructor fetch failed:", err);
        handleLogout();
      }
    };

    fetchInstructor();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  return (
    <div className="bg-white px-4 sm:px-6 py-3 flex justify-between items-center shadow-sm relative">
      <img src={logo} alt="logo" className="h-12 sm:h-16 md:h-20" />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
        <NavLink
          to="/instructor-students"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 text-lg"
              : "text-gray-600 hover:text-black"
          }
        >
          MyStudents
        </NavLink>

        <NavLink
          to="/instructor-dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 text-lg"
              : "text-gray-600 hover:text-black"
          }
        >
          MyCourses
        </NavLink>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={profile.profileImage || lina}
            alt="user"
            className="h-8 w-8 rounded-full object-cover"
          />
          <NavLink to="/profile-instructor" className="text-gray-800">
            {profile.name}
          </NavLink>
          <FaChevronDown className="text-xs lg:text-sm" />
          <button
            onClick={handleLogout}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded-sm text-xs"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-56 bg-white border rounded-lg shadow-lg mt-2 p-4 flex flex-col gap-3 text-sm z-50">
          <NavLink
            to="/instructor-students"
            className={({ isActive }) =>
              isActive
                ? "text-black underline"
                : "text-gray-600 hover:text-black"
            }
            onClick={() => setMenuOpen(false)}
          >
            MyStudents
          </NavLink>

          <NavLink
            to="/instructor-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-teal-500 font-semibold underline"
                : "text-gray-600 hover:text-black"
            }
            onClick={() => setMenuOpen(false)}
          >
            MyCourses
          </NavLink>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={profile.profileImage || lina}
              alt="user"
              className="h-8 w-8 rounded-full object-cover"
            />
            <NavLink to="/profile-instructor" onClick={() => setMenuOpen(false)}>
              {profile.name}
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 px-3 py-1 bg-red-500 text-white rounded-md text-xs"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Instructornavbar;
