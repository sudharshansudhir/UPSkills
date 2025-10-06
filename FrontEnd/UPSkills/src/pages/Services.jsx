import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaLaptopCode, FaPalette, FaBullhorn, FaChartLine, FaDatabase, FaCamera } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const services = [
  {
    icon: <FaLaptopCode size={28} />,
    title: "Web Development",
    description: "Build responsive and modern websites using React, Node.js, and other latest technologies.",
  },
  {
    icon: <FaPalette size={28} />,
    title: "UI/UX Design",
    description: "Design stunning user interfaces and experiences for web and mobile apps.",
  },
  {
    icon: <FaBullhorn size={28} />,
    title: "Digital Marketing",
    description: "Promote your business effectively using SEO, social media, and marketing strategies.",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Business Consulting",
    description: "Provide insights, strategies, and solutions to grow businesses efficiently.",
  },
  {
    icon: <FaDatabase size={28} />,
    title: "Database Management",
    description: "Manage databases like SQL, MongoDB, and ensure data integrity and security.",
  },
  {
    icon: <FaCamera size={28} />,
    title: "Photography & Videography",
    description: "Capture amazing photos and videos for personal or commercial projects.",
  },
];

const Services = () => {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#2ec4b6] text-white py-20 px-6 md:px-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-md sm:text-lg md:text-xl max-w-2xl mx-auto">
          Explore the wide range of services we offer to help you grow and learn efficiently.
        </p>
      </section>

      {/* Services Cards */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#e0f7f5] rounded-full text-[#2ec4b6]">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want to start a project with us?</h2>
        <p className="text-gray-700 mb-6">
          Contact us today and our team will help you achieve your goals with our expert services.
        </p>
        <NavLink
          to="/contactus"
          className="inline-block bg-[#2ec4b6] hover:bg-[#27b2a6] text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Contact Us
        </NavLink>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
