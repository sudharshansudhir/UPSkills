import React from "react";
import instructor_img from "../assets/instructor.png";
import student_img from "../assets/student.png";
import { NavLink } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-teal-50 min-h-screen px-6 py-16 md:px-20 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
        What is <span className="text-teal-600">UPSkills?</span>
      </h2>

      {/* Description */}
      <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed text-base sm:text-lg">
        UPSkills is a platform that empowers educators to create online classes,
        store and manage learning materials, assignments, quizzes, and exams — all in one place. 
        It enables seamless grading, progress tracking, and real-time feedback, 
        making learning engaging and accessible for students worldwide.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Instructor Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px] sm:min-h-[320px] md:min-h-[360px] transform transition duration-300 hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${instructor_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 group-hover:from-black/80 transition duration-300"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">For Instructors</h3>
            <p className="text-sm sm:text-base max-w-xs mb-6 text-gray-200">
              Share your knowledge, upload courses, and inspire thousands of learners.
            </p>
            <NavLink
              to="/login"
              className="px-6 py-2 sm:px-8 sm:py-3 border-2 border-white rounded-full hover:bg-white hover:text-black font-medium transition"
            >
              Start Teaching Today
            </NavLink>
          </div>
        </div>

        {/* Student Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px] sm:min-h-[320px] md:min-h-[360px] transform transition duration-300 hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${student_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 group-hover:from-black/80 transition duration-300"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">For Students</h3>
            <p className="text-sm sm:text-base max-w-xs mb-6 text-gray-200">
              Learn anytime, anywhere. Explore courses and upgrade your skills.
            </p>
            <NavLink
              to="/register"
              className="px-6 py-2 sm:px-8 sm:py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 font-medium transition"
            >
              Enroll Now
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
