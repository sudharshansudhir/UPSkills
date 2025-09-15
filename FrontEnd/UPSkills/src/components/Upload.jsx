import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    moduleName: "",
    duration: "",
    lessonName: "",
    video: "",
    thumbnail: "",
    resources: "",
    description: "",
    title: "",
    category: "",
    price: "",
    oldPrice: "",
    language: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ===== Quiz states =====
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", ""], answer: "" }]);
  const [quizzes, setQuizzes] = useState([]);

  // ===== Handlers =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login as instructor to upload video");
      navigate("/login");
      return;
    }

    const fd = new FormData();
    fd.append("video", file);

    try {
      setUploading(true);
      setUploadProgress(0);

      const res = await axios.post("http://localhost:5000/api/courses/upload/video", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setFormData((prev) => ({ ...prev, video: res.data.url }));
      alert("✅ Video uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Video upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // ===== Quiz Handlers =====
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[optIdx] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""], answer: "" }]);
  };

  const saveQuiz = () => {
    if (!quizTitle || questions.length === 0) {
      alert("Fill quiz title and at least one question");
      return;
    }
    setQuizzes([...quizzes, { title: quizTitle, questions }]);
    setQuizTitle("");
    setQuestions([{ question: "", options: ["", ""], answer: "" }]);
    alert("✅ Quiz saved!");
  };

  // ===== Submit Course =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first");
      navigate("/login");
      return;
    }

    try {
      const finalData = {
        ...formData,
        quizzes,
      };

      await axios.post("http://localhost:5000/api/courses", finalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Course uploaded successfully!");
      navigate("/instructor-dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading course");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f7fa]">
      {/* Sidebar */}
      <div className="md:w-[25%] w-full p-6 bg-gray-100 border-r">
        <button
          onClick={() => navigate("/instructor-dashboard")}
          className="text-teal-600 flex items-center gap-2 mb-6"
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <ul className="space-y-2 mb-8">
          <li className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-400">
            <span className="text-sm text-gray-700">
              {formData.lessonName || "No lesson added"}
            </span>
            <span className="text-xs text-gray-500 float-right">
              {formData.duration || "—"}
            </span>
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="md:w-[75%] w-full p-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#147b96] mb-4">
            {formData.lessonName || "Upload a New Lesson"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Fields */}
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" className="p-2 border rounded"/>
            <input type="text" name="moduleName" value={formData.moduleName} onChange={handleChange} placeholder="Module Name" className="p-2 border rounded"/>
            <input type="text" name="lessonName" value={formData.lessonName} onChange={handleChange} placeholder="Lesson Name" className="p-2 border rounded"/>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" className="p-2 border rounded"/>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded"/>
            <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="p-2 border rounded"/>
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded"/>
            <input type="text" name="oldPrice" value={formData.oldPrice} onChange={handleChange} placeholder="Old Price" className="p-2 border rounded"/>
            <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="p-2 border rounded md:col-span-2"/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" className="p-2 border rounded md:col-span-2"/>

            {/* Video Upload */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium">Upload Video (mp4, webm)</label>
              <input type="file" accept="video/*" onChange={handleVideoFile} className="w-full border-1 border-black rounded-md p-2" />
              {uploading && <div className="text-sm text-gray-600">Uploading: {uploadProgress}%</div>}
              {formData.video && (
                <div className="mt-2 text-sm">
                  <div>Uploaded URL:</div>
                  <a href={formData.video} target="_blank" rel="noreferrer" className="text-blue-600 underline break-words">{formData.video}</a>
                </div>
              )}
            </div>

            {/* ===== Quiz Section ===== */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-md border mb-4">
              <h3 className="font-bold mb-2 text-gray-700">📚 Add Quiz</h3>
              <input
                type="text"
                placeholder="Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              {questions.map((q, idx) => (
                <div key={idx} className="mb-2 border p-2 rounded">
                  <input
                    type="text"
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                    className="w-full p-2 border rounded mb-1"
                  />
                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, i, e.target.value)}
                      className="w-full p-2 border rounded mb-1"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(idx, "answer", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}

              <div className="flex gap-2 mt-2">
                <button type="button" onClick={addQuestion} className="px-3 py-1 bg-gray-500 text-white rounded">
                  ➕ Add Question
                </button>
                <button type="button" onClick={saveQuiz} className="px-3 py-1 bg-green-500 text-white rounded">
                  💾 Save Quiz
                </button>
              </div>

              {/* Saved Quizzes Preview */}
              {quizzes.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Saved Quizzes:</h4>
                  <ul className="space-y-2">
                    {quizzes.map((qz, i) => (
                      <li key={i} className="border p-2 rounded bg-white">
                        <p className="font-semibold">{qz.title}</p>
                        <ul className="list-disc ml-6">
                          {qz.questions.map((ques, j) => (
                            <li key={j}>{ques.question}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="bg-[#1faacb] hover:bg-[#159ab4] text-white px-6 py-2 rounded-md md:col-span-2">
              Save Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
