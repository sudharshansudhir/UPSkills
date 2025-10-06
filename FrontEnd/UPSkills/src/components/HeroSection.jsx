import React from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-teal-700/5">
        
    
    <section
      className="flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between pt-10 px-4 md:px-16 lg:px-24 xl:px-32"
      
    >
      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start">
        {/* Heading */}
        <h1 className="text-center md:text-left text-5xl leading-[68px] md:text-6xl md:leading-[84px] font-medium max-w-xl text-slate-900">
          Learn. Grow. <span className="text-teal-600">Achieve.</span>
        </h1>

        {/* Subtext */}
        <p className="text-center md:text-left text-sm text-slate-700 max-w-lg mt-4">
          UPSkills empowers students and instructors to connect, learn, and excel online. 
          Discover courses, track progress, and unlock your potential anytime, anywhere.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-8 text-sm">
          <NavLink
            to="/explore"
            className="flex items-center gap-2 border border-teal-600 active:scale-95 hover:bg-teal-700 hover:text-white transition text-slate-600 rounded-md px-6 h-11"
          >
            Explore Courses
          </NavLink>
          <NavLink
            to="/register"
            className="flex items-center gap-2 border border-teal-600 active:scale-95 hover:bg-teal-700 hover:text-white transition text-slate-600 rounded-md px-6 h-11"
          >
            <span>Get Started</span>
          </NavLink>
        </div>
      </div>

      {/* Hero Image */}
      <img
        src="https://www.asuprepglobalacademy.org/wp-content/uploads/2025/05/is-online-high-school-worth-it-pros-and-cons-hero.jpg"
        alt="hero"
        className="max-w-xs  sm:max-w-sm lg:max-w-md transition-all duration-300"
      />
    </section>
  </div>);
};

export default HeroSection;
