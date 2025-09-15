import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuizResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { courseId: paramCourseId } = useParams(); // get courseId from URL
  const courseId = state?.courseId || paramCourseId;

  if (!state) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow">
          <p className="text-center text-lg text-gray-600">
            No results found. Please attempt a quiz first.
          </p>
          <div className="text-center mt-6">
            <button
              onClick={() =>
                navigate(courseId ? `/student-quiz/${courseId}` : -1)
              }
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
            >
              📝 Take Quiz
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { score, total, correctQuestions, wrongQuestions } = state;
  const performance = ((score / total) * 100).toFixed(0);
  const strengths = correctQuestions.length ? correctQuestions : ["None yet"];
  const weaknesses = wrongQuestions.length ? wrongQuestions : ["Great job! 🎉 No mistakes"];

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 mt-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📊 Quiz Results
        </h2>

        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-700">
            🎉 You scored <span className="text-[#2ec4b6]">{score}</span> / {total}
          </p>
          <p className="text-lg text-gray-600">
            Performance: <span className="font-bold">{performance}%</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-50 rounded-lg shadow">
            <h3 className="font-bold text-lg text-green-700 mb-3">💪 Strengths</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-red-50 rounded-lg shadow">
            <h3 className="font-bold text-lg text-red-700 mb-3">⚠️ Weak Areas</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow">
          <h3 className="font-bold text-lg text-blue-700 mb-3">🎯 Recommended Focus</h3>
          <p className="text-gray-700">
            {performance >= 80
              ? "Excellent work! Keep practicing to stay sharp 🚀"
              : performance >= 50
              ? "Good effort! Review your weak areas and practice more 📘"
              : "Needs improvement. Focus on fundamentals first, then attempt more quizzes 📚"}
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-10 flex-wrap">
          <button
            onClick={() => navigate(`/student-quiz/${courseId}`)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            🔄 Retake Quiz
          </button>
          <button
            onClick={() => navigate(`/currentcourse/${courseId}`)}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-500 transition"
          >
            ⬅ Back to Course
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizResults;
