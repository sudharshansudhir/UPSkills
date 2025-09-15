import React, { useState, useEffect } from 'react';
import logo from "../assets/UPSkills-logo.png";
import logo2 from "../assets/UPSkills-logo (1).png";
import mob_bg from "../assets/UPSkills-bg-mob.png";
import userImg from "../assets/lina.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaTimes } from 'react-icons/fa';
import axios from "axios";

const dummyNotifications = [
  { msg: "New Course Uploaded from Instructor 1" },
  { msg: "New task updated for Course 3" },
  { msg: "Successfully got certified" },
  { msg: "New quiz added to Module 1 from Course 2" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndNotifs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data;

        setIsLoggedIn(true);
        setUsername(userData.name || "User");
        setRole(userData.role || "student");

        // ✅ Fetch notifications
        const notifRes = await axios.get("http://localhost:5000/api/notifications/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(notifRes.data);
      } catch (err) {
        console.error("Navbar user fetch failed:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndNotifs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    setUsername("User");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="min-h-[90px] hidden md:block bg-white shadow-sm relative">
        <div className="mx-6 lg:mx-16">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <img src={logo} alt="logo" className="lg:h-20 h-20" />
            <div className="flex gap-10 lg:gap-20 items-center">
              <div className="flex gap-6 lg:gap-10 items-center text-sm lg:text-base">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>Home</NavLink>
                {isLoggedIn && role === "student" && (
                  <>
                    <NavLink to="/courses" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>Courses</NavLink>
                    <NavLink to="/explore" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>Explore</NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>MyWishlist</NavLink>
                  </>
                )}
                {isLoggedIn && role === "instructor" && (
                  <>
                    <NavLink to="/instructor-students" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>MyStudents</NavLink>
                    
                    <NavLink to="/instructor-dashboard" className={({ isActive }) => isActive ? 'active_l' : 'not_l'}>MyCourses</NavLink>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    {/* 🔔 Bell with only count */}
                    <button onClick={() => setShowNotifications(true)} className="relative">
                      <FaBell size={20} className='text-black' />
                      {notifications.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </button>

                    {/* Profile + Logout */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate(role === "instructor" ? "/profile-instructor" : "/profile")}
                      >
                        <img src={userImg} alt="user" className="h-8 w-8 rounded-full object-cover" />
                        <span className="font-medium text-sm lg:text-base">{username} ▼</span>
                      </div>
                      <button 
                        onClick={handleLogout} 
                        className="px-3 lg:px-4 py-1 bg-red-500 text-white rounded-md text-xs lg:text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <NavLink to="/login" className="px-4 lg:px-6 py-2 bg-gray-300 rounded-full text-gray-800 text-xs lg:text-sm font-medium">Login</NavLink>
                    <NavLink to="/register" className="px-4 lg:px-6 py-2 bg-gray-500 rounded-full text-white text-xs lg:text-sm font-medium">Register</NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Notification Slide Panel */}
        {isLoggedIn && (
          <div
            className={`fixed top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              showNotifications ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-base sm:text-lg text-black font-semibold">Notifications</h2>
              <button onClick={() => setShowNotifications(false)}>
                <FaTimes size={18} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : notifications.length === 0 ? (
                <p className="text-gray-500">No notifications found</p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {notifications.map((note, index) => (
                    <div key={note._id || index} className="bg-green-100 text-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-md">
                      {note.message || note.msg}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="min-h-[90px] block md:hidden bg-cover bg-no-repeat" style={{ backgroundImage: isLoggedIn ? 'none' : `url(${mob_bg})` }}>
        <div className="px-4 sm:px-6 py-2 flex justify-between items-center bg-white shadow-sm">
          <img src={logo2} alt="logo" className="h-14" />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <span className="text-2xl">☰</span>}
          </button>
        </div>

        {/* ✅ Sliding Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-6 text-sm">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>

            {isLoggedIn && role === "student" && (
              <>
                <NavLink to="/courses" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>Courses</NavLink>
                <NavLink to="/explore" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>Explore</NavLink>
                <NavLink to="/wishlist" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>MyWishlist</NavLink>
              </>
            )}

            {isLoggedIn && role === "instructor" && (
              <>
                <NavLink to="/instructor-students" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>MyStudents</NavLink>
                
                <NavLink to="/instructor-dashboard" className={({ isActive }) => isActive ? "active" : "not"} onClick={() => setIsOpen(false)}>MyCourses</NavLink>
              </>
            )}

            <div className="pt-6 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(role === "instructor" ? "/profile-instructor" : "/profile");
                    }}
                  >
                    <img src={userImg} className="h-8 w-8 rounded-full" alt="User" />
                    <span className="font-medium">{username} ▼</span>
                  </div>
                  <button onClick={handleLogout} className="mt-2 text-red-500 text-sm font-medium text-left">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="px-6 py-2 bg-gray-100 rounded-full text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Login</NavLink>
                  <NavLink to="/register" className="px-6 py-2 bg-gray-500 text-white rounded-full font-medium" onClick={() => setIsOpen(false)}>Register</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
