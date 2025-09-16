import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import lina from "../assets/lina.png"; // fallback instructor avatar
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const API_BASE = import.meta.env.VITE_API_BASE;

const Discount = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses`);
        const discounted = res.data.filter(
          (course) =>
            course.oldPrice && course.price && course.oldPrice > course.price
        );
        setCourses(discounted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ⭐ Reusable RatingStars component
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
        <span className="ml-1 text-gray-600 text-xs">
          ({rating?.toFixed(1) || "0.0"})
        </span>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-8">Loading courses...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <section className="bg-[#eaf6ff] px-4 sm:px-8 md:px-20 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Flat Discounted
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={course.thumbnail || lina}
              alt={course.title}
              className="rounded-xl w-full h-40 sm:h-44 md:h-48 object-cover"
            />

            <div className="m-2 flex justify-between text-xs sm:text-sm text-gray-500">
              <h3>{course.category || "General"}</h3>
              <h3>{course.duration || "N/A"}</h3>
            </div>

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mt-2">
              {course.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {course.description?.substring(0, 80) ||
                "No description available"}
            </p>

            {/* ⭐ Rating */}
            <div className="mt-2">
              <RatingStars rating={course.rating || 0} />
            </div>

            <div className="flex justify-between mt-3 items-center flex-wrap gap-2">
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

              <div className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded">
                <NavLink to={`/coursedetails/${course._id}`}>Buy Now</NavLink>
              </div>

              <div className="flex gap-2 items-center text-xs sm:text-sm">
                <h4 className="line-through text-gray-500">
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
          No discounted courses available at the moment.
        </p>
      )}
    </section>
  );
};

export default Discount;
