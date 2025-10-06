import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/UPSkills-whitelogo.png';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users?role=student`);
        setStudents(res.data);
        setSelected(res.data[0] || null);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
  };

  const filteredSortedStudents = students
    .filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.phone || '').includes(searchTerm) ||
      (s.address || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField] || '';
      const valB = b[sortField] || '';
      if (typeof valA === 'string') return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  const handleDelete = async (studentId) => {
    if (!studentId) return Swal.fire('Error', 'Student ID is missing!', 'error');

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this student? ❌',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE}/api/admin/users/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(prev => prev.filter(s => s._id !== studentId));
      setSelected(null);
      Swal.fire('Deleted!', 'Student deleted successfully ✅', 'success');
    } catch (err) {
      console.error("Failed to delete student:", err.response?.data || err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to delete student 😢', 'error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-[#0b1d4f] w-full md:w-60 text-white p-4 md:fixed h-auto md:h-screen left-0 top-0">
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="UPSkills" className="h-16 md:h-24 w-auto" />
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admindashboard" className="hover:bg-[#1a2a50] px-4 py-2 rounded">🏠 Dashboard</NavLink>
          <NavLink to="/admin-instructors" className="hover:bg-[#1a2a50] px-4 py-2 rounded">👩‍🏫 Instructors</NavLink>
          <NavLink to="/admin-students" className="bg-[#16c9c6] px-4 py-2 rounded">🧑‍🎓 Students</NavLink>
          <NavLink to="/admin-courses" className="hover:bg-[#1a2a50] px-4 py-2 rounded">📚 Courses</NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-60 flex-1 flex flex-col min-h-screen bg-white">
        <main className="flex-grow p-4 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">🧑‍🎓 Students</h1>
            <input
              type="text"
              placeholder="🔍 Search students..."
              className="border px-3 py-2 rounded w-full sm:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr className="text-gray-500 border-b">
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('name')}>👤 Name{renderSortArrow('name')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('email')}>📧 Email{renderSortArrow('email')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('phone')}>📱 Phone{renderSortArrow('phone')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('address')}>🏠 Address{renderSortArrow('address')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSortedStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`cursor-pointer ${selected?._id === student._id ? 'bg-blue-100' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                    onClick={() => setSelected(student)}
                  >
                    <td className="py-2 px-3">🧑 {student.name}</td>
                    <td className="py-2 px-3">{student.email}</td>
                    <td className="py-2 px-3">{student.phone || "N/A"}</td>
                    <td className="py-2 px-3">{student.address || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="border rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2">🧑 {selected.name}</h2>
              <p>📧 Email: {selected.email}</p>
              <p>📱 Phone: {selected.phone || "N/A"}</p>
              <p>🏠 Address: {selected.address || "N/A"}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <button 
                  onClick={() => handleDelete(selected._id)} 
                  className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminStudents;
