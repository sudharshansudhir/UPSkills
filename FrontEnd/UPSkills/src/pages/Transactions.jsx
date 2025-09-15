import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/UPSkills-whitelogo.png";
import Footer from "../components/Footer";

const Transactions = () => {
  // 🔹 Mock data (replace with API later)
  const [transactions] = useState([
    {
      id: 1,
      student: "Ravi Kumar",
      course: "React Basics",
      amount: 1200,
      date: "2025-08-01",
      status: "Completed",
    },
    {
      id: 2,
      student: "Anita Sharma",
      course: "Node.js Crash",
      amount: 1500,
      date: "2025-08-03",
      status: "Completed",
    },
    {
      id: 3,
      student: "John Doe",
      course: "Python ML",
      amount: 2000,
      date: "2025-08-05",
      status: "Pending",
    },
    {
      id: 4,
      student: "Priya S",
      course: "UI/UX Design",
      amount: 1800,
      date: "2025-08-07",
      status: "Failed",
    },
  ]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-[#0b1d4f] w-full md:w-60 text-white p-4 md:fixed md:top-0 md:left-0 md:h-screen flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
        {/* Logo */}
        <div className="flex justify-center items-center mb-0 md:mb-6 w-full">
          <img src={logo} alt="UPSkills" className="h-12 sm:h-16 md:h-20 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex flex-row md:flex-col gap-2 w-full justify-center md:justify-start mt-2 md:mt-4">
          <NavLink
            to="/admindashboard"
            className="hover:bg-[#1a2a50] px-3 py-2 rounded flex items-center gap-2 text-xs sm:text-sm md:text-base"
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/admin-instructors"
            className="hover:bg-[#1a2a50] px-3 py-2 rounded flex items-center gap-2 text-xs sm:text-sm md:text-base"
          >
            <FaChalkboardTeacher /> Instructors
          </NavLink>
          <NavLink
            to="/admin-students"
            className="hover:bg-[#1a2a50] px-3 py-2 rounded flex items-center gap-2 text-xs sm:text-sm md:text-base"
          >
            <FaUserGraduate /> Students
          </NavLink>
          <NavLink
            to="/admin-transactions"
            className="bg-[#16c9c6] px-3 py-2 rounded flex items-center gap-2 text-xs sm:text-sm md:text-base"
          >
            <FaMoneyBillWave /> Transactions
          </NavLink>
        </nav>
      </div>

      {/* Content + Footer */}
      <div className="md:ml-60 flex-1 flex flex-col bg-white">
        {/* Main */}
        <main className="flex-grow px-3 sm:px-6 lg:px-10 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
            <FaMoneyBillWave className="text-green-600 text-lg sm:text-2xl" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Transaction History
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-xs sm:text-sm md:text-base border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 sm:p-3 text-left border">ID</th>
                  <th className="p-2 sm:p-3 text-left border">Student</th>
                  <th className="p-2 sm:p-3 text-left border">Course</th>
                  <th className="p-2 sm:p-3 text-left border">Amount (₹)</th>
                  <th className="p-2 sm:p-3 text-left border">Date</th>
                  <th className="p-2 sm:p-3 text-left border">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 sm:p-3 border">{txn.id}</td>
                    <td className="p-2 sm:p-3 border">{txn.student}</td>
                    <td className="p-2 sm:p-3 border">{txn.course}</td>
                    <td className="p-2 sm:p-3 border font-medium">
                      ₹{txn.amount}
                    </td>
                    <td className="p-2 sm:p-3 border">{txn.date}</td>
                    <td
                      className={`p-2 sm:p-3 border font-semibold ${
                        txn.status === "Completed"
                          ? "text-green-600"
                          : txn.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Transactions;
