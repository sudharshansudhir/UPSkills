import React from "react";
import { NavLink } from "react-router-dom";

const RemoteLearning = () => {
  return (
    <section className="px-4 sm:px-6 md:px-20 py-12 sm:py-16">
      <div className="bg-[#262747] text-white rounded-2xl py-10 sm:py-12 px-4 sm:px-6 md:px-20 text-center">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4">
          Online coaching lessons for remote learning.
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
          UPSkills’ online learning platform empowers instructors and students with everything they need –
          from course creation, enrollment, and progress tracking to assignments, payments, and real-time
          interaction – all in one secure cloud-based system.
        </p>
        <NavLink
          to="/currentcourse"
          className="bg-[#2ec4b6] hover:bg-[#27b3a6] text-white text-xs sm:text-sm font-semibold py-2 px-4 sm:px-5 rounded"
        >
          Start learning now
        </NavLink>
      </div>
    </section>
  );
};

export default RemoteLearning;
