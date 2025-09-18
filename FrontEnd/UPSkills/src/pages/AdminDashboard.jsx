import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/UPSkills-whitelogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"; // ✅ recharts import

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminDashboard = () => {
  const [usersAnalytics, setUsersAnalytics] = useState(null);
  const [latestInstructors, setLatestInstructors] = useState([]);
  const [latestStudents, setLatestStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin-login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [usersAnalyticsRes, latestInstructorsRes, latestStudentsRes] =
          await Promise.all([
            axios.get(`${API_BASE}/api/admin/analytics/users`, { headers }),
            axios.get(`${API_BASE}/api/admin/latest-instructors`, { headers }),
            axios.get(`${API_BASE}/api/admin/latest-students`, { headers }),
          ]);

        setUsersAnalytics(usersAnalyticsRes.data);
        setLatestInstructors(latestInstructorsRes.data);
        setLatestStudents(latestStudentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Admin fetch error: ", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
        }
      }
    };

    fetchAll();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminRole");
    navigate("/login");
  };

  if (loading) return <div className="p-6">⏳ Loading admin dashboard...</div>;

  // ✅ Prepare data for charts
  const chartData = [
    { name: "Students", value: usersAnalytics?.students ?? 0 },
    { name: "Instructors", value: usersAnalytics?.instructors ?? 0 },
    { name: "Courses", value: usersAnalytics?.courses ?? 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#102244] text-white flex flex-col p-6 md:fixed md:top-0 md:bottom-0">
        <div className="mb-6 md:mb-12 flex justify-center">
          <img src={logo} alt="UPSkills Logo" className="h-16 md:h-24 w-auto" />
        </div>
        <nav className="space-y-2 md:space-y-4 flex flex-col md:block">
          <NavLink to="/admindashboard" className="flex items-center gap-2 bg-teal-500 px-4 py-2 rounded-md">
            🏠 Dashboard
          </NavLink>
          <NavLink to="/admin-instructors" className="flex items-center gap-2 px-4 py-2 hover:bg-[#1a3261] rounded-md">
            👩‍🏫 Instructors
          </NavLink>
          <NavLink to="/admin-students" className="flex items-center gap-2 px-4 py-2 hover:bg-[#1a3261] rounded-md">
            🧑‍🎓 Students
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 flex flex-col min-h-screen">
        <main className="flex-grow px-4 md:px-10 py-6 md:py-8 bg-white">
          <div className="flex justify-end mb-6">
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              🚪 Log out
            </button>
          </div>

          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold">📊 ADMIN DASHBOARD</h1>
            <p className="text-gray-500 text-base md:text-lg">
              Welcome back 👋 {localStorage.getItem("adminName")}
            </p>
          </div>

          {/* Emoji Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <EmojiStatCard icon="👥" title="Total Users" value={usersAnalytics?.totalUsers ?? 0} color="bg-blue-100" />
            <EmojiStatCard icon="🎓" title="Students" value={usersAnalytics?.students ?? 0} color="bg-green-100" />
            <EmojiStatCard icon="👩‍🏫" title="Instructors" value={usersAnalytics?.instructors ?? 0} color="bg-purple-100" />
            <EmojiStatCard icon="⏳" title="Pending Instructors" value={usersAnalytics?.pendingInstructors ?? 0} color="bg-yellow-100" />
          </div>

          {/* ✅ Statistics Graphs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Bar Chart */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow">
              <h3 className="font-semibold mb-4">📈 Bar Chart Overview</h3>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2ec4b6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow">
              <h3 className="font-semibold mb-4">🥧 Pie Chart Overview</h3>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow lg:col-span-2">
              <h3 className="font-semibold mb-4">📉 Line Chart Overview</h3>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Latest Users Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
            {/* Latest Instructors */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow">
              <h3 className="font-semibold mb-4">👩‍🏫 Latest Instructors</h3>
              {latestInstructors.length === 0 ? (
                <p className="text-gray-500">No new instructors</p>
              ) : (
                <ul className="space-y-2">
                  {latestInstructors.map((i) => (
                    <li key={i._id} className="border p-2 rounded flex flex-col sm:flex-row sm:justify-between">
                      <span>👩‍🏫 {i.name} ({i.email})</span>
                      <span className="text-sm text-gray-400">✨ New</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Latest Students */}
            <div className="bg-white border rounded-lg p-4 md:p-6 shadow">
              <h3 className="font-semibold mb-4">🎓 Latest Students</h3>
              {latestStudents.length === 0 ? (
                <p className="text-gray-500">No new students</p>
              ) : (
                <ul className="space-y-2">
                  {latestStudents.map((s) => (
                    <li key={s._id} className="border p-2 rounded flex flex-col sm:flex-row sm:justify-between">
                      <span>🎓 {s.name} ({s.email})</span>
                      <span className="text-sm text-gray-400">✨ New</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const EmojiStatCard = ({ icon, title, value, color }) => (
  <div className={`${color} p-4 md:p-5 rounded-xl shadow-md flex flex-col items-center justify-center`}>
    <div className="text-3xl md:text-4xl mb-2">{icon}</div>
    <h3 className="text-sm md:text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-lg md:text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default AdminDashboard;
