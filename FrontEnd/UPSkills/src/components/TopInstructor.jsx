import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import lina from "../assets/lina.png";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

  const API_BASE = import.meta.env.VITE_API_BASE;

const TopInstructor = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses`);
        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading top instructors...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  // ⭐ Render stars with react-icons
  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return <div className="flex items-center gap-1 text-sm">{stars}</div>;
  };

  return (
    <section className="px-4 sm:px-6 md:px-20 py-10">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Top Instructors
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-2xl shadow-sm">
            <img
              src={course.thumbnail || lina}
              alt={course.title}
              className="rounded-xl w-full h-40 sm:h-44 object-cover"
            />

            <div className="m-2 flex justify-between text-xs sm:text-sm text-gray-500">
              <h3>{course.category || "General"}</h3>
              <h3>{course.duration || "N/A"}</h3>
            </div>

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mt-2 sm:mt-4">
              {course.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600">
              {course.description?.substring(0, 80) || "No description available"}
            </p>

            {/* ⭐ Rating */}
            <div className="mt-2 flex items-center gap-2">
              {renderStars(course.rating)}
              <span className="text-gray-600 text-xs sm:text-sm">
                ({course.rating?.toFixed(1) || "0.0"})
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4 items-start sm:items-center gap-3">
              {/* Instructor */}
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor?.image || lina}
                  alt={course.instructor?.name || "Instructor"}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-xs sm:text-sm text-black">
                  {course.instructor?.name || "Instructor"}
                </p>
              </div>

              {/* Buy Now */}
              <div className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded">
                <NavLink to={`/coursedetails/${course._id}`}>Buy Now</NavLink>
              </div>

              {/* Price */}
              <div className="flex gap-2 items-center text-xs sm:text-sm">
                <h4 className="line-through text-gray-500">${course.oldPrice || "0"}</h4>
                <h4 className="text-[#2ec4b6]">${course.price || "0"}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No courses available at the moment.
        </p>
      )}
    </section>
  );
};

export default TopInstructor;
