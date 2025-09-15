import React, { useEffect, useState } from "react";
import Instructornavbar from "../components/Instructornavbar";
import Instructorfooter from "../components/Footer";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Instructordashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch instructor's own courses
 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/courses/instructor/my-courses", // ✅ correct
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);

  // Delete a course
const handleDelete = async (courseId) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // update state
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(error.response?.data?.message || "Failed to delete course");
    }
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6fbfd]">
      <Instructornavbar />

      <div className="max-w-7xl mx-auto px-6 py-10 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">My Courses</h2>
        </div>

        {/* Course cards */}
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses uploaded yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4"
              >
                <img
                  src={course.thumbnail || "https://via.placeholder.com/300x200"}
                  alt="course"
                  className="w-full h-36 object-cover rounded-lg"
                />

                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <p>{course.category || "General"}</p>
                  <p>{course.duration || "N/A"}</p>
                </div>

                <h3 className="font-semibold mt-1 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {course.description || "No description provided."}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://via.placeholder.com/30"
                      alt="Instructor"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm">
                      {course.instructor?.name || "You"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <NavLink to={`/instructor-edit/${course._id}`} className="bg-[#2ec4b6] text-white px-3 py-1 rounded">Edit</NavLink>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  {course.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">
                      {course.oldPrice}
                    </span>
                  )}
                  <span className="text-teal-500 font-semibold">
                    {course.price ? `$${course.price}` : "Free"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Course Button */}
        <div className="flex justify-center mt-10">
          <NavLink
            to="/instructor-upload"
            className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white font-semibold px-6 py-3 rounded-full"
          >
            Add New Course
          </NavLink>
        </div>
      </div>

      <Instructorfooter />
    </div>
  );
};

export default Instructordashboard;
