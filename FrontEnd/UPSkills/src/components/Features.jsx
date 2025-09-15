import React from "react";
import { FaChalkboardTeacher, FaCertificate, FaClock, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaChalkboardTeacher className="text-[#2ec4b6] text-3xl sm:text-4xl" />,
    title: "Expert Instructors",
    desc: "Learn from industry professionals with years of teaching and real-world experience.",
  },
  {
    icon: <FaCertificate className="text-[#2ec4b6] text-3xl sm:text-4xl" />,
    title: "Quizes",
    desc: "Validate yourself after watching a module through Quizes",
  },
  {
    icon: <FaClock className="text-[#2ec4b6] text-3xl sm:text-4xl" />,
    title: "Flexible Learning",
    desc: "Learn at your own pace with 24/7 access to course materials.",
  },
  {
    icon: <FaUsers className="text-[#2ec4b6] text-3xl sm:text-4xl" />,
    title: "Community Support",
    desc: "Engage with peers, mentors, and instructors in discussion forums.",
  },
];

const Features = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-20 py-12">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-10">
        Why Choose <span className="text-[#2ec4b6]">UPSkills</span>?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {features.map((f, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-[#f9f9f9] p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {f.icon}
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-4">{f.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
