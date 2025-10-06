import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/UPSkills-whitelogo.png';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
        setSelected(res.data[0] || null);
      } catch (err) {
        console.error('Failed to fetch courses:', err.response?.data || err);
      }
    };
    fetchCourses();
  }, [token]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
  };

  // Helper to get field value for sorting
  const getFieldValue = (obj, field) => {
    switch (field) {
      case 'title':
        return obj.title || '';
      case 'price':
        return obj.price || 0;
      case 'rating':
        return obj.rating || 0;
      case 'instructorName':
        return obj.instructor?.name || '';
      case 'uploadedOn':
        return obj.uploadedOn ? new Date(obj.uploadedOn).getTime() : 0;
      default:
        return '';
    }
  };

  const filteredSortedCourses = courses
    .filter(c =>
      (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.instructor?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = getFieldValue(a, sortField);
      const valB = getFieldValue(b, sortField);

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
    });

  const handleDelete = async (id) => {
    if (!id) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this course? ❌',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(prev => prev.filter(course => course._id !== id));
      setSelected(null);
      Swal.fire('Deleted!', 'Course deleted successfully ✅', 'success');
    } catch (err) {
      console.error('Failed to delete course:', err.response?.data || err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to delete course 😢', 'error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-[#0b1d4f] w-full md:w-60 text-white p-4 md:fixed top-0 left-0 md:h-screen">
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="UPSkills" className="h-16 md:h-24 w-auto" />
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admindashboard" className="hover:bg-[#1a2a50] px-4 py-2 rounded">🏠 Dashboard</NavLink>
          <NavLink to="/admin-instructors" className="hover:bg-[#1a2a50] px-4 py-2 rounded">👩‍🏫 Instructors</NavLink>
          <NavLink to="/admin-students" className="hover:bg-[#1a2a50] px-4 py-2 rounded">🧑‍🎓 Students</NavLink>
          <NavLink to="/admin-courses" className="bg-[#16c9c6] px-4 py-2 rounded">📚 Courses</NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-60 flex-1 flex flex-col min-h-screen">
        <main className="flex-grow p-4 md:p-8 bg-white">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">📚 Courses</h1>
            <input
              type="text"
              placeholder="🔍 Search courses..."
              className="border px-3 py-2 rounded w-full sm:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('title')}>📖 Title{renderSortArrow('title')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('price')}>💰 Price{renderSortArrow('price')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('instructorName')}>👩‍🏫 Instructor{renderSortArrow('instructorName')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('rating')}>⭐ Rating{renderSortArrow('rating')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('uploadedOn')}>📅 Uploaded On{renderSortArrow('uploadedOn')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSortedCourses.map((course, idx) => (
                  <tr
                    key={course._id}
                    className={`cursor-pointer ${selected?._id === course._id ? 'bg-blue-100' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                    onClick={() => setSelected(course)}
                  >
                    <td className="py-2 px-3">{course.title || 'N/A'}</td>
                    <td className="py-2 px-3">₹{course.price || 'N/A'}</td>
                    <td className="py-2 px-3">{course.instructor?.name || 'N/A'}</td>
                    <td className="py-2 px-3">{course.rating || 'N/A'}</td>
                    <td className="py-2 px-3">{course.createdAt || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="mt-6 p-4 border rounded bg-gray-50 space-y-2">
              <h2 className="text-lg md:text-xl font-semibold">📖 {selected.title || 'N/A'}</h2>
              <p>💰 <strong>Price:</strong> ₹{selected.price || 'N/A'}</p>
              <p>👩‍🏫 <strong>Instructor:</strong> {selected.instructor?.name || 'N/A'}</p>
              <p>⭐ <strong>Rating:</strong> {selected.rating || 'N/A'}</p>
              <p>📄 <strong>Description:</strong> {selected.description || 'No description'}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(selected._id)}
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

export default AdminCourses;
