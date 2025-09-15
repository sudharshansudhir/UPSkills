import React from "react";
import logo from "../assets/UPSkills-whitelogo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e1e2f] text-white px-6 md:px-20 py-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 max-w-7xl mx-auto">
        {/* Logo + tagline */}
        <div className="text-center md:text-left max-w-xs">
          <img src={logo} alt="logo" className="w-32 mx-auto md:mx-0" />
          <p className="mt-3 text-sm font-light leading-relaxed">
            A modern E-learning Platform for all ages.<br />
            Learn, Upskill, and Achieve your goals 🚀
          </p>
          {/* Social Media Links */}
          {/* <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="bg-white/10 hover:bg-[#2ec4b6] p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white/10 hover:bg-[#2ec4b6] p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white/10 hover:bg-[#2ec4b6] p-2 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-white/10 hover:bg-[#2ec4b6] p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-white/10 hover:bg-[#2ec4b6] p-2 rounded-full transition">
              <FaYoutube />
            </a>
          </div> */}
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg mb-4">ABOUT</p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#2ec4b6]">About Us</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Career</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Blog</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg mb-4">Discover on UPSKILLS</p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#2ec4b6]">Become instructor</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">For Ads</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Plans and pricing</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Help and support</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg mb-4">Connect Us</p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#2ec4b6]">Instagram</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Gmail</a></li>
            <li><a href="#" className="hover:text-[#2ec4b6]">Discord</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center flex-1">
          <p className="font-medium mb-4 text-lg">Subscribe to our Newsletter</p>
          <div className="flex flex-col sm:flex-row items-center bg-white/10 rounded-full overflow-hidden max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 text-sm outline-none text-white w-full"
            />
            <button className="bg-[#2ec4b6] px-6 py-2 text-sm font-semibold rounded-full text-white hover:bg-[#28b1a6] transition w-full sm:w-auto">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">Stay updated with our latest courses & news</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Links */}
      <div className="text-center text-sm text-gray-400 space-y-2 max-w-7xl mx-auto">
        <div className="flex justify-center flex-wrap gap-4">
          <a href="#" className="hover:text-[#2ec4b6]">Privacy Policy</a>
          <span className="opacity-30 hidden sm:block">|</span>
          <a href="#" className="hover:text-[#2ec4b6]">Terms & Conditions</a>
          <span className="opacity-30 hidden sm:block">|</span>
          <a href="#" className="hover:text-[#2ec4b6]">Community</a>
        </div>
        <p className="text-xs mt-2">© 2025 Class Technologies Inc. | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;