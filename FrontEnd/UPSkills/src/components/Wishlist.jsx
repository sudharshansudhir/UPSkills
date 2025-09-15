import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/api/wishlist/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-20 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No courses in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((course) => (
            <div key={course.courseId} className="bg-white border p-4 rounded-2xl shadow-sm">
              <img
                src={course.image}
                alt="course-img"
                className="rounded-xl w-full h-36 sm:h-44 object-cover"
              />
              <h3 className="font-semibold text-base sm:text-lg mt-2">{course.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {course.category} • {course.duration}
              </p>
              <div className="flex justify-between mt-3 items-center text-xs sm:text-sm">
                <p className="text-[#2ec4b6] font-bold">${course.price}</p>
                <button
                  onClick={() => handleRemove(course.courseId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 flex justify-end">
                <NavLink
                  to={`/coursedetails/${course.courseId}`}
                  className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 sm:px-5 rounded"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
