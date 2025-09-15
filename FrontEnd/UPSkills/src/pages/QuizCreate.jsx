import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Instructornavbar from "../components/Instructornavbar";

const QuizCreate = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [quizList, setQuizList] = useState(
    JSON.parse(localStorage.getItem("quizzes")) || []
  );

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSaveQuiz = () => {
    if (!question || options.length < 2 || !correctAnswer) {
      alert("Please fill all fields properly!");
      return;
    }

    const newQuiz = { question, options, answer: correctAnswer };
    const updatedList = [...quizList, newQuiz];

    setQuizList(updatedList);
    localStorage.setItem("quizzes", JSON.stringify(updatedList));

    setQuestion("");
    setOptions(["", ""]);
    setCorrectAnswer("");

    alert("✅ Quiz added successfully!");
  };

  return (
    <>
      <Instructornavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 mt-6 sm:mt-10 bg-white/90 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          ✍️ Create New Quiz
        </h2>

        {/* Question Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            placeholder="Enter your question"
          />
        </div>

        {/* Options Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Options
          </label>
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm mb-2 text-sm sm:text-base"
              placeholder={`Option ${idx + 1}`}
            />
          ))}
          <button
            onClick={handleAddOption}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition w-full sm:w-auto text-sm sm:text-base"
          >
            ➕ Add Option
          </button>
        </div>

        {/* Correct Answer Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Correct Answer
          </label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full border px-3 py-2 rounded shadow-sm text-sm sm:text-base"
            placeholder="Enter correct answer"
          />
        </div>

        {/* Save Quiz */}
        <button
          onClick={handleSaveQuiz}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition w-full text-sm sm:text-base"
        >
          💾 Save Quiz
        </button>

        {/* Show Saved Quizzes */}
        <div className="mt-10">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            📚 Saved Quizzes
          </h3>
          {quizList.length > 0 ? (
            quizList.map((q, i) => (
              <div
                key={i}
                className="p-4 mb-3 border rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-sm sm:text-base">
                  {i + 1}. {q.question}
                </p>
                <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
                  {q.options.map((op, j) => (
                    <li key={j}>{op}</li>
                  ))}
                </ul>
                <p className="mt-1 text-green-600 text-sm sm:text-base">
                  ✅ Correct Answer: {q.answer}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">
              No quizzes created yet
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizCreate;
