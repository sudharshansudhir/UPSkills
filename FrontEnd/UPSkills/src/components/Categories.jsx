import React from 'react';
import { FaPaintBrush, FaCode, FaDatabase, FaComments, FaLaptopCode, FaBriefcase, FaRobot } from 'react-icons/fa';

const categories = [
  { 
    icon: <FaLaptopCode size={28} />, 
    title: 'Frontend', 
    color: 'bg-indigo-100',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks like React to build beautiful user interfaces.'
  },
  { 
    icon: <FaCode size={28} />, 
    title: 'Backend', 
    color: 'bg-blue-100',
    description: 'Master server-side programming, APIs, databases, and authentication using Node, Express, and more.'
  },
  { 
    icon: <FaPaintBrush size={28} />, 
    title: 'Design', 
    color: 'bg-teal-100',
    description: 'Learn UI/UX principles, wireframing, prototyping, and visual design to create engaging interfaces.'
  },
  { 
    icon: <FaCode size={28} />, 
    title: 'Coding', 
    color: 'bg-purple-100',
    description: 'Sharpen your problem-solving and programming skills with algorithms, data structures, and logic.'
  },
  { 
    icon: <FaComments size={28} />, 
    title: 'Communication', 
    color: 'bg-orange-100',
    description: 'Improve soft skills, public speaking, and effective communication for professional growth.'
  },
  { 
    icon: <FaDatabase size={28} />, 
    title: 'Database', 
    color: 'bg-green-100',
    description: 'Understand relational and NoSQL databases, SQL queries, and data management strategies.'
  },
  { 
    icon: <FaBriefcase size={28} />, 
    title: 'Management', 
    color: 'bg-teal-200',
    description: 'Learn project management, team coordination, and leadership skills for real-world projects.'
  },
  { 
    icon: <FaRobot size={28} />, 
    title: 'Prompt Engineering', 
    color: 'bg-gray-200',
    description: 'Master AI prompt engineering, ChatGPT usage, and designing intelligent workflows with AI tools.'
  },
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
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
