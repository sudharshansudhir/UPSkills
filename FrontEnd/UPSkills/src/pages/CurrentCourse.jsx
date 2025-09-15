import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CurrentCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div className="p-6 text-center">No current course found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#eaf6ff]">
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-white rounded-xl p-4 sm:p-6 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Modules</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 rounded-lg border bg-[#e0f7f6] text-sm sm:text-base">
              📘 {course.lessonName || "Lesson 1"}
              <span className="text-xs sm:text-sm">{course.duration}</span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-xl p-4 sm:p-6">
          <div className="mb-6">
            {course.video ? (
              <video
                controls
                className="w-full h-48 sm:h-72 md:h-[400px] rounded-xl object-cover"
                src={course.video}
              ></video>
            ) : (
              <p>No video uploaded</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
              {course.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{course.description}</p>
          </div>

          <button
            onClick={() => navigate(`/student-quiz/${id}`)}
            className="bg-[#2ec4b6] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
          >
            Attempt Quiz
          </button>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CurrentCourse;
