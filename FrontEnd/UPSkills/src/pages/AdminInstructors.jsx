import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/UPSkills-whitelogo.png';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';

  const API_BASE = import.meta.env.VITE_API_BASE;
const AdminInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get('${API_BASE}/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const instructorsOnly = res.data.filter(user => user.role === 'instructor');
        setInstructors(instructorsOnly);
        setSelected(instructorsOnly[0] || null);
      } catch (err) {
        console.error('Failed to fetch instructors:', err.response?.data || err);
      }
    };
    fetchInstructors();
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

  const filteredSortedInstructors = instructors
    .filter(i =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.phone || '').includes(searchTerm) ||
      (i.address || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField] || '';
      const valB = b[sortField] || '';
      if (typeof valA === 'string') return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this instructor? ❌');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInstructors(prev => prev.filter(ins => ins._id !== id));
      setSelected(null);
      alert('Instructor deleted successfully ✅');
    } catch (err) {
      console.error('Failed to delete instructor:', err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to delete instructor 😢');
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
          <NavLink to="/admin-instructors" className="bg-[#16c9c6] px-4 py-2 rounded">👩‍🏫 Instructors</NavLink>
          <NavLink to="/admin-students" className="hover:bg-[#1a2a50] px-4 py-2 rounded">🧑‍🎓 Students</NavLink>
          {/* <NavLink to="/admin-transactions" className="hover:bg-[#1a2a50] px-4 py-2 rounded">💸 Transactions</NavLink> */}
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-60 flex-1 flex flex-col min-h-screen">
        <main className="flex-grow p-4 md:p-8 bg-white">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">👩‍🏫 Instructors</h1>
            <input
              type="text"
              placeholder="🔍 Search instructors..."
              className="border px-3 py-2 rounded w-full sm:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('name')}>🧑 Name{renderSortArrow('name')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('email')}>📧 Email{renderSortArrow('email')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('phone')}>📱 Phone{renderSortArrow('phone')}</th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('address')}>🏠 Address{renderSortArrow('address')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSortedInstructors.map((ins, idx) => (
                  <tr
                    key={ins._id}
                    className={`cursor-pointer ${selected?._id === ins._id ? 'bg-blue-100' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                    onClick={() => setSelected(ins)}
                  >
                    <td className="py-2 px-3">🧑 {ins.name}</td>
                    <td className="py-2 px-3">{ins.email}</td>
                    <td className="py-2 px-3">{ins.phone || 'N/A'}</td>
                    <td className="py-2 px-3">{ins.address || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="mt-6 p-4 border rounded bg-gray-50 space-y-2">
              <h2 className="text-lg md:text-xl font-semibold">🧑 {selected.name}</h2>
              <p>📧 <strong>Email:</strong> {selected.email}</p>
              <p>📱 <strong>Phone:</strong> {selected.phone || 'N/A'}</p>
              <p>🏠 <strong>Address:</strong> {selected.address || 'N/A'}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    if (!window.confirm('Approve this instructor? ✅')) return;
                    try {
                      await axios.put(`${API_BASE}/api/admin/approve-instructor/${selected._id}`, {}, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      alert('Instructor approved ✅');
                    } catch (err) {
                      console.error(err);
                      alert('Failed to approve instructor ❌');
                    }
                  }}
                >
                  ✅ Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    if (!window.confirm('Decline and delete this instructor? ❌')) return;
                    try {
                      await axios.delete(`${API_BASE}/api/admin/decline-instructor/${selected._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setInstructors(prev => prev.filter(ins => ins._id !== selected._id));
                      setSelected(null);
                      alert('Instructor declined ❌');
                    } catch (err) {
                      console.error(err);
                      alert('Failed to decline instructor ❌');
                    }
                  }}
                >
                  ❌ Decline
                </button>
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

export default AdminInstructors;
