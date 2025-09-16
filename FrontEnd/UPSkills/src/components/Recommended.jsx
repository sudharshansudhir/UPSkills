import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import lina from "../assets/lina.png";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

  const API_BASE = import.meta.env.VITE_API_BASE;

const Recommended = () => {
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

  // ⭐ Reusable Rating Component
  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500 text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
        <span className="ml-1 text-gray-600 text-xs">({rating?.toFixed(1) || "0.0"})</span>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-8">Loading courses...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <section className="bg-[#eaf6ff] px-4 sm:px-6 md:px-20 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Recommended For You
        </h2>
      </div>

      {/* Course Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mt-2">
              {course.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {course.description?.substring(0, 80) || "No description available"}
            </p>

            {/* ⭐ Rating Stars */}
            <div className="mt-2">
              <RatingStars rating={course.rating || 0} />
            </div>

            <div className="flex justify-between mt-4 items-center flex-wrap gap-2">
              {/* Instructor */}
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor?.image || lina}
                  alt={course.instructor?.name || "Instructor"}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-sm text-black">
                  {course.instructor?.name || "Instructor"}
                </p>
              </div>

              {/* Buy Now */}
              <NavLink
                to={`/coursedetails/${course._id}`}
                className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 sm:px-5 rounded"
              >
                Buy Now
              </NavLink>

              {/* Price */}
              <div className="flex gap-2 items-center">
                <h4 className="text-[12px] line-through text-gray-500">
                  ${course.oldPrice || "0"}
                </h4>
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

export default Recommended;
