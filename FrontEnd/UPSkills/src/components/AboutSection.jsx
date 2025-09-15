import React from "react";
import instructor_img from "../assets/instructor.png";
import student_img from "../assets/student.png";
import { NavLink } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-teal-300 min-h-screen text-white px-6 py-16 md:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        What is <span className="text-teal-600">UPSkills?</span>
      </h2>

      <p className="text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed text-sm sm:text-base">
        UPSkills is a platform that allows educators to create online classes whereby they can store
        the course materials online; manage assignments, quizzes and exams; monitor due dates; grade
        results and provide students with feedback all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Instructor */}
        <div
          className="relative rounded-xl overflow-hidden group min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
          style={{
            backgroundImage: `url(${instructor_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* permanent shadow overlay */}
          <div className="absolute inset-0 bg-black/50 bg-opacity-50 group-hover:bg-opacity-60 transition duration-300"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">FOR INSTRUCTORS</h3>
            <NavLink
              to="/login"
              className="px-5 py-2 sm:px-6 sm:py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition text-sm sm:text-base"
            >
              Start teaching today
            </NavLink>
          </div>
        </div>

        {/* Student */}
        <div
          className="relative rounded-xl overflow-hidden group min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
          style={{
            backgroundImage: `url(${student_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* permanent shadow overlay */}
          <div className="absolute inset-0 bg-black/50 bg-opacity-50 group-hover:bg-opacity-60 transition duration-300"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">FOR STUDENTS</h3>
            <NavLink
              to="/register"
              className="px-5 py-2 sm:px-6 sm:py-2 bg-[#00bcd4] text-white rounded-full hover:bg-[#0193a3] transition text-sm sm:text-base"
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
