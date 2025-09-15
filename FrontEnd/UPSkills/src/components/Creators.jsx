import React from 'react';
import img1 from '../assets/creator1.png';

const creators = [
  { name: 'Jane Cooper', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
  { name: 'Adam', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
  { name: 'Tomara', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
  { name: 'Jane Cooper', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
  { name: 'Jane Cooper', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
  { name: 'Jane Cooper', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
];

const Creators = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center sm:text-left">
          Classes taught by real creators
        </h2>
        <a href="#" className="text-[#2ec4b6] text-sm font-medium hover:underline">
          See all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="bg-white border shadow-md rounded-xl overflow-hidden text-center p-4 sm:p-6 hover:shadow-xl transition"
          >
            <img
              src={img1}
              alt={creator.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{creator.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">{creator.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Creators;
