import React from 'react';
import { FaPaintBrush, FaDesktop, FaDatabase, FaBriefcase, FaRobot, FaCamera, FaFilm } from 'react-icons/fa';

const categories = [
  { icon: <FaPaintBrush size={28} />, title: 'Design', color: 'bg-teal-100' },
  { icon: <FaDesktop size={28} />, title: 'Development', color: 'bg-indigo-100' },
  { icon: <FaDatabase size={28} />, title: 'Database', color: 'bg-blue-100' },
  { icon: <FaBriefcase size={28} />, title: 'Business', color: 'bg-teal-100' },
  { icon: <FaRobot size={28} />, title: 'Marketing', color: 'bg-orange-100' },
  { icon: <FaCamera size={28} />, title: 'Photography', color: 'bg-rose-100' },
  { icon: <FaFilm size={28} />, title: 'Acting', color: 'bg-gray-200' },
  { icon: <FaBriefcase size={28} />, title: 'Business', color: 'bg-teal-100' },
];

const Categories = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-white">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
        Choose your favourite course from top categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl text-center p-4 sm:p-6 hover:shadow-lg transition-all"
          >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${cat.color}`}>
              <span className="text-gray-700">{cat.icon}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">{cat.title}</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
