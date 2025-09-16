import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import bgimg from "../assets/CourseDetails.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
  const API_BASE = import.meta.env.VITE_API_BASE;
const ExploreSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const allCategories = ["All", ...new Set(courses.map((c) => c.category))];
  const allLanguages = ["All", ...new Set(courses.map((c) => c.language))];

  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) =>
      selectedCategory === "All" ? true : course.category === selectedCategory
    )
    .filter((course) =>
      selectedLanguage === "All" ? true : course.language === selectedLanguage
    )
    .sort((a, b) => {
      if (selectedSort === "lowtohigh") return a.price - b.price;
      if (selectedSort === "hightolow") return b.price - a.price;
      if (selectedSort === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  // ⭐ Function to render stars based on rating
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

  if (loading) return <p className="text-center mt-20">Loading courses...</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* 🔎 Search & Filters Section */}
      <div
        className="relative h-[220px] sm:h-[260px] md:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <input
            type="text"
            placeholder="Search your favourite course"
            className="w-full max-w-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md outline-none bg-white text-gray-700 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap gap-3 justify-center mt-4 sm:mt-6">
            <select
              className="px-3 py-2 text-sm rounded-lg bg-white text-gray-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {allCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 text-sm rounded-lg bg-white text-gray-600"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {allLanguages.map((lang, i) => (
                <option key={i} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 text-sm rounded-lg bg-white text-gray-600"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              <option value="lowtohigh">Price:Low to High</option>
              <option value="hightolow">Price:High to Low</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📚 All Courses Section */}
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          All Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={course.thumbnail}
                alt="course-img"
                className="rounded-xl w-full h-40 sm:h-44 md:h-48 object-cover"
              />

              <div className="m-2 flex justify-between text-xs sm:text-sm text-gray-500">
                <h3>{course.category}</h3>
                <h3>{course.duration}</h3>
              </div>

              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mt-2">
                {course.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {course.description.slice(0, 50)}...
              </p>

              {/* ⭐ Rating Section */}
              <div className="mt-2">
              <RatingStars rating={course.rating || 0} />
            </div>

              <div className="flex justify-between mt-3 items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor?.image || ""}
                    alt="instructor"
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-xs sm:text-sm text-black">
                    {course.instructor?.name}
                  </p>
                </div>

                <div className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded">
                  <NavLink to={`/coursedetails/${course._id}`}>Buy Now</NavLink>
                </div>

                <div className="flex gap-2 items-center text-xs sm:text-sm">
                  <h4 className="line-through text-gray-500">
                    ${course.oldPrice}
                  </h4>
                  <h4 className="text-[#2ec4b6]">${course.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No courses found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreSearch;
