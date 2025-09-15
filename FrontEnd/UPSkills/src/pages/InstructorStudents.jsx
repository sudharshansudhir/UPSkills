import React from "react";
import Instructornavbar from "../components/Instructornavbar";
import Instructorfooter from "../components/Footer";
import StudentsList from "../components/StudentsList";

const InstructorStudents = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Instructornavbar />
      <div className="max-w-7xl mx-auto px-6 py-10 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Students</h2>
        <StudentsList />
      </div>
      <Instructorfooter />
    </div>
  );
};

export default InstructorStudents;
