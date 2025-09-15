import React, { useState, useEffect } from "react";
import lina from "../assets/lina.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Instructornavbar from "../components/Instructornavbar";

const InstructorProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    expertise: "",
    experience: "",
    qualifications: "",
    linkedin: "",
    courses: 0,
    students: 0,
    rating: "",
    role: "instructor",
    profileImage: lina,
    other: [],
  });

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = () => {
    localStorage.setItem("instructorProfile", JSON.stringify(user));
    setEditMode(false);
    alert("Profile updated ✅");
    window.dispatchEvent(new Event("userProfileUpdated"));
  };

  const handleLogout = () => {
    localStorage.removeItem("instructorProfile");
    localStorage.removeItem("token");
    alert("Logged out successfully 🚪");
    navigate("/login");
    window.dispatchEvent(new Event("userProfileUpdated"));
  };

  // 🔹 Add new "other link"
  const addOtherLink = () => {
    setUser({ ...user, other: [...user.other, ""] });
  };

  // 🔹 Update specific "other link"
  const updateOtherLink = (index, value) => {
    const updatedLinks = [...user.other];
    updatedLinks[index] = value;
    setUser({ ...user, other: updatedLinks });
  };

  // 🔹 Remove "other link"
  const removeOtherLink = (index) => {
    const updatedLinks = user.other.filter((_, i) => i !== index);
    setUser({ ...user, other: updatedLinks });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      // Ensure "other" is always array
      if (!Array.isArray(parsedUser.other)) {
        parsedUser.other = parsedUser.other ? [parsedUser.other] : [];
      }

      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <Instructornavbar />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl mt-6 sm:mt-10 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
          Instructor Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <img
            src={user.profileImage || lina}
            alt="Profile"
            className="rounded-full mb-3 w-28 h-28 sm:w-36 sm:h-36 object-cover shadow-lg border-4 border-blue-400"
          />
          <p className="text-xl sm:text-2xl font-semibold text-gray-700">
            {user.name}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Expert in {user.expertise}
          </p>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-inner">
          <InputField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Name"
          />
          <InputField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Email"
          />
          <InputField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Phone Number"
          />
          <InputField
            label="Date of Birth"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your DOB"
          />
          <InputField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Address"
          />
          <InputField
            label="Expertise"
            name="expertise"
            value={user.expertise}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Expertise"
          />
          <InputField
            label="Experience"
            name="experience"
            value={user.experience}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Experience"
          />
          <InputField
            label="Qualifications"
            name="qualifications"
            value={user.qualifications}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your Qualifications"
          />
          <InputField
            label="LinkedIn"
            name="linkedin"
            value={user.linkedin}
            onChange={handleChange}
            editMode={editMode}
            placeholder="Enter your LinkedIn URL"
          />

          {/* 🔹 Other Links (Dynamic) */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-600 mb-2 font-medium">
              Other Links
            </label>
            {user.other.map((link, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2"
              >
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => updateOtherLink(index, e.target.value)}
                      className="px-3 py-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={() => removeOtherLink(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      ✖
                    </button>
                  </>
                ) : (
                  <a
                    href={link.startsWith("http") ? link : `https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 border rounded bg-gray-100 shadow-inner text-blue-600 underline w-full"
                  >
                    {link}
                  </a>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={addOtherLink}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                ➕ Add Link
              </button>
            )}
          </div>
        </div>

        {/* Courses & Students */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 border rounded-lg bg-gradient-to-r from-[#e0f0ff] to-[#fff] shadow text-center sm:text-left">
          <p className="text-base sm:text-lg font-medium">
            📈 Uploaded {user.courses} Courses
          </p>
          <p className="text-base sm:text-lg font-medium">
            👨‍🎓 {user.students} Students Enrolled
          </p>
        </div>

        {/* Achievements */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 border rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-700">
            🏆 Achievements & Highlights
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
            <li>
              🌟 Rated <span className="font-semibold">{user.rating}</span> by
              students
            </li>
            <li>🎖️ 2x Best Instructor Award</li>
            <li>📜 Published 10+ Research Papers</li>
            <li>💼 Worked with Fortune 500 Companies</li>
            <li>🌍 Mentored students from 15+ countries</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap justify-center">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:from-green-500 hover:to-green-700 transition-all w-full sm:w-auto"
              >
                ✅ Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold shadow-md hover:from-gray-500 hover:to-gray-700 transition-all w-full sm:w-auto"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 transition-all w-full sm:w-auto"
            >
              ✏️ Edit Profile
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold shadow-md hover:from-purple-500 hover:to-purple-700 transition-all w-full sm:w-auto"
          >
            ⬅ Back to Homepage
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow-md hover:from-red-500 hover:to-red-700 transition-all w-full sm:w-auto"
          >
            🚪 Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

// 🔹 Reusable Input Field
const InputField = ({ label, name, value, onChange, editMode, placeholder }) => (
  <div>
    <label className="block text-gray-600 mb-1 font-medium">{label}</label>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
      />
    ) : (
      <p
        className={`px-3 py-2 border rounded bg-gray-100 shadow-inner ${
          !value ? "text-gray-400 italic" : ""
        }`}
      >
        {value || placeholder}
      </p>
    )}
  </div>
);

export default InstructorProfile;
