import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import team1 from "../assets/img1.png";
import team2 from "../assets/img2.png";
import team3 from "../assets/img3.png";
import { NavLink } from "react-router-dom";
const AboutUs = () => {
  const teamMembers = [
    { name: "Sudharshan Sudhir", role: "Founder & CEO", image: team1 },
    { name: "Jane Doe", role: "Lead Instructor", image: team2 },
    { name: "John Smith", role: "Marketing Head", image: team3 },
  ];

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#2ec4b6] text-white py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About UPSkills
          </h1>
          <p className="text-md sm:text-lg md:text-xl max-w-2xl mx-auto">
            Empowering learners worldwide with cutting-edge courses and expert instructors.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 text-md sm:text-lg leading-relaxed">
            At UPSkills, our mission is to provide high-quality online education that empowers students to achieve their goals. 
            We combine practical skills with real-world knowledge to help learners excel in their careers.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Values</h2>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
            <p className="text-gray-600">
              Delivering courses crafted by industry experts to ensure maximum learning impact.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Constantly innovating to keep our content relevant and engaging for learners.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Building a supportive global community for students and instructors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Meet Our Team</h2>
          <p className="text-gray-700 mt-2">
            A group of passionate professionals dedicated to providing the best learning experience.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 px-6 md:px-16 bg-[#2ec4b6] text-white text-center rounded-t-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join UPSkills Today</h2>
        <p className="mb-6">Start learning from expert instructors and boost your career!</p>
        <NavLink
          to="/register"
          className="bg-white text-[#2ec4b6] font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition"
        >
          Get Started
        </NavLink>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
