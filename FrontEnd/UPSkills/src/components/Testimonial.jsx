import React from 'react';
import Marquee from 'react-fast-marquee';

const Testimonial = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-12 px-6 md:px-20 py-16">
      {/* Left Side Text Content */}
      <div className="md:w-1/2 space-y-4 text-left">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 font-medium">Testimonial</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">What They Say?</h2>
        <p className="text-sm sm:text-base text-gray-600">
          UPSkills has got more than 100k positive ratings from our users around the world.
        </p>
        <p className="text-sm sm:text-base text-gray-600">
          Some of the students and teachers were greatly helped by the UPSkills.
        </p>
      </div>

      {/* Right Side - Marquee Testimonials */}
      <div className="md:w-1/2 w-full">
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          <div className="flex gap-5">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="max-w-[280px] sm:max-w-[320px] bg-black text-white rounded-2xl mx-2 sm:mx-4 overflow-hidden flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={
                      index === 0
                        ? "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
                        : index === 1
                        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
                        : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
                    }
                    alt=""
                    className="h-52 sm:h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
                  />
                </div>
                <div className="px-4 pb-4">
                  <p className="font-medium text-sm sm:text-base border-b border-gray-600 pb-3 sm:pb-5">
                    “Radiant made undercutting all of our competitors an absolute breeze.”
                  </p>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base">— John Doe</p>
                  <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
                    Content Marketing
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonial;
