import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

  const API_BASE = import.meta.env.VITE_API_BASE;

const Welcome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE}/api/courses/me/enrolled-courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(res.data);
      } catch (err) {
        console.error("No enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [location]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!courses || courses.length === 0)
    return <div className="p-6">No enrolled courses yet</div>;

  return (
    <section className="bg-[#eaf6ff] px-4 sm:px-6 md:px-20 py-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Welcome back, continue learning!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-2xl shadow-sm flex flex-col"
          >
            <img
              src={course.thumbnail}
              alt="course-img"
              className="rounded-xl w-full h-36 sm:h-44 object-cover"
            />
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mt-4">
              {course.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {course.description?.slice(0, 80)}...
            </p>
            <NavLink
              to={`/currentcourse/${course._id}`}
              className="mt-4 bg-[#2ec4b6] text-white py-2 rounded-lg text-center text-xs sm:text-sm"
            >
              Continue
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Welcome;
