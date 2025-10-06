import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    // Frontend validation
    if (!name || name.length < 3) {
      Swal.fire({ icon: "error", title: "Name must be at least 3 characters", confirmButtonColor: "#2ec4b6" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Swal.fire({ icon: "error", title: "Enter a valid email", confirmButtonColor: "#2ec4b6" });
      return;
    }
    if (!subject || subject.length < 3) {
      Swal.fire({ icon: "error", title: "Subject must be at least 3 characters", confirmButtonColor: "#2ec4b6" });
      return;
    }
    if (!message || message.length < 10) {
      Swal.fire({ icon: "error", title: "Message must be at least 10 characters", confirmButtonColor: "#2ec4b6" });
      return;
    }

    // Here you can send form data to backend API
    Swal.fire({ icon: "success", title: "Message sent successfully ✅", confirmButtonColor: "#2ec4b6" });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#2ec4b6] text-white py-20 px-6 md:px-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-md sm:text-lg md:text-xl max-w-2xl mx-auto">
          Have questions? Reach out to us and we will get back to you promptly.
        </p>
      </section>

      {/* Contact Form & Details */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-700">
            You can reach us via email or phone. Our team is ready to answer your questions and help you get started with UPSkills.
          </p>
          <div className="space-y-3">
            <p className="text-gray-600"><span className="font-semibold">Email:</span> support@upskills.com</p>
            <p className="text-gray-600"><span className="font-semibold">Phone:</span> +91 9876543210</p>
            <p className="text-gray-600"><span className="font-semibold">Address:</span> 123 Learning St, Chennai, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ec4b6]"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ec4b6]"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ec4b6]"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ec4b6] resize-none h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-[#2ec4b6] text-white font-semibold rounded-full hover:bg-[#27b2a6] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <iframe
            title="UPSkills Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.621508164631!2d80.27071831462106!3d13.082680690594155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d0f3f2e4e7%3A0x8eddb0a5c6b1b8f2!2sChennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1695725312345!5m2!1sen!2sus"
            className="w-full h-64 md:h-96 rounded-2xl shadow"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
