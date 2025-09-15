import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaVideo } from "react-icons/fa";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users?role=student");
        setStudents(res.data);
        setFiltered(res.data);
        setSelectedStudent(res.data[0] || null);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.class || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredStudents);
    if (!filteredStudents.find((s) => s._id === selectedStudent?._id)) {
      setSelectedStudent(filteredStudents[0] || null);
    }
  }, [searchTerm, students, selectedStudent]);

  const handleSort = (key) => {
    const sorted = [...filtered].sort((a, b) => {
      const valA = a[key] || "";
      const valB = b[key] || "";
      if (typeof valA === "string") return valA.localeCompare(valB);
      return valA - valB;
    });
    setFiltered(sorted);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6  p-4 bg-gray-50">
      {/* Left student table */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {/* Search + Sort */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="🔍 Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-auto flex-grow focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded text-xs sm:text-sm hover:bg-blue-600"
            onClick={() => handleSort("name")}
          >
            👤 Name
          </button>
          <button
            className="px-3 py-2 bg-green-500 text-white rounded text-xs sm:text-sm hover:bg-green-600"
            onClick={() => handleSort("_id")}
          >
            🆔 Id
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto flex-grow pr-2 max-h-[400px] sm:max-h-[500px] lg:max-h-full">
          <table className="w-full border text-xs sm:text-sm">
            <thead className="bg-gray-100 text-left sticky top-0 z-10">
              <tr>
                <th className="px-2 sm:px-4 py-2">👤 Name</th>
                <th className="px-2 sm:px-4 py-2">🆔 ID</th>
                <th className="px-2 sm:px-4 py-2">📧 Email</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr
                    key={student._id}
                    onClick={() => setSelectedStudent(student)}
                    className={`cursor-pointer ${
                      selectedStudent?._id === student._id ? "bg-blue-100" : ""
                    }`}
                  >
                    <td className="px-2 sm:px-4 py-2">{student.name}</td>
                    <td className="px-2 sm:px-4 py-2 break-words">{student._id}</td>
                    <td className="px-2 sm:px-4 py-2 break-words">{student.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right profile card */}
      {selectedStudent && filtered.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow-sm h-fit">
          <p className="text-xs sm:text-sm text-gray-400 mb-2">
            🆔 {selectedStudent._id}
          </p>
          <h3 className="text-lg sm:text-xl font-bold">👤 {selectedStudent.name}</h3>
          <p className="text-gray-500 mb-2">{selectedStudent.title || "Student"}</p>
          <p className="text-gray-600 text-sm break-words mb-4">
            📧 {selectedStudent.email}
          </p>

          <div className="flex justify-center gap-4 mt-2 text-gray-600">
            <FaEnvelope className="cursor-pointer hover:text-blue-500" />
            <FaPhoneAlt className="cursor-pointer hover:text-green-500" />
            <FaVideo className="cursor-pointer hover:text-purple-500" />
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
            {selectedStudent.bio || "Dedicated learner with strong motivation."}
          </p>

          <div className="mt-4 flex justify-center gap-8 sm:gap-10 text-xs sm:text-sm text-gray-700">
            <p>
              <strong>Age</strong>
              <br />
              {selectedStudent.age || "20"}
            </p>
            <p>
              <strong>Gender</strong>
              <br />
              {selectedStudent.gender || "Male"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
