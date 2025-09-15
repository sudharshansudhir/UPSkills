import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../assets/UPSkills-whitelogo.png"; // your footer logo

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-6 sm:px-10 md:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        
        {/* Logo + About */}
        <div>
          <img src={logo} alt="logo" className="w-28 sm:w-32 mb-4" />
          <p className="text-xs sm:text-sm text-gray-400">
            UPSkills is your trusted platform to learn new skills, grow your career, and achieve success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
            <li className="hover:text-[#2ec4b6] cursor-pointer">Home</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">Courses</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">About</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
            <li className="hover:text-[#2ec4b6] cursor-pointer">Help Center</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">FAQs</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#2ec4b6] cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#2ec4b6] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#2ec4b6] transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#2ec4b6] transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#2ec4b6] transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center text-xs sm:text-sm text-gray-500 mt-8 pt-4">
        © {new Date().getFullYear()} UPSkills. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
