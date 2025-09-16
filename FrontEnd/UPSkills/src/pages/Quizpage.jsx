import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

  const API_BASE = import.meta.env.VITE_API_BASE;

const QuizPage = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Fetch all quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses/${courseId}`);
        const courseQuizzes = res.data.quizzes || [];

        const allQuestions = courseQuizzes.flatMap((q) =>
          q.questions.map((quest) => ({
            ...quest,
            quizTitle: q.title,
          }))
        );

        setQuestions(allQuestions);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        alert("No quizzes found for this course");
      }
    };
    fetchQuizzes();
  }, [courseId]);

  const handleSelect = (qid, option) => {
    setSelectedAnswers({ ...selectedAnswers, [qid]: option });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const wrongQuestions = [];
    const correctQuestions = [];

    questions.forEach((q) => {
      if (selectedAnswers[q._id] === q.answer) {
        correctCount++;
        correctQuestions.push(q.question);
      } else {
        wrongQuestions.push(q.question);
      }
    });

    navigate(`/quiz-results/${courseId}`, {
      state: {
        score: correctCount,
        total: questions.length,
        correctQuestions,
        wrongQuestions,
        courseId,
      },
    });
  };

  const handleReset = () => setSelectedAnswers({});

  if (!questions.length)
    return (
      <div className="p-6 sm:p-10 text-center text-gray-600">
        No quizzes available for this course.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 mt-6 sm:mt-10 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
            📝 Quiz Time!
          </h2>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div
                key={q._id}
                className="p-4 sm:p-6 bg-gradient-to-r from-[#f9fcff] to-[#fff] border rounded-xl shadow-md"
              >
                {q.quizTitle && (
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    {q.quizTitle}
                  </p>
                )}
                <h3 className="font-semibold text-base sm:text-lg text-gray-700 mb-4">
                  {idx + 1}. {q.question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options?.map((opt) => {
                    const btnClass =
                      selectedAnswers[q._id] === opt
                        ? "bg-[#2ec4b6] text-white border-[#2ec4b6] scale-105"
                        : "bg-white hover:bg-gray-100 border-gray-300";
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q._id, opt)}
                        className={`px-3 sm:px-4 py-2 rounded-lg border text-left transition duration-200 shadow-sm text-sm sm:text-base ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-600 transition text-sm sm:text-base"
            >
              ✅ Submit
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:bg-gray-500 transition text-sm sm:text-base"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizPage;
