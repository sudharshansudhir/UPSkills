import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Instructornavbar from "../components/Instructornavbar";

const Instructoredit = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: "",
    questions: [{ question: "", options: ["", ""], answer: "" }],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          title: res.data.title || "",
          moduleName: res.data.moduleName || "",
          lessonName: res.data.lessonName || "",
          duration: res.data.duration || "",
          category: res.data.category || "",
          language: res.data.language || "",
          price: res.data.price || "",
          oldPrice: res.data.oldPrice || "",
          thumbnail: res.data.thumbnail || "",
          description: res.data.description || "",
          video: res.data.video || "",
        });
        setOriginalData(res.data);
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch course details");
      }
    };
    fetchCourse();
  }, [courseId]);

  // --- Form Handlers ---
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

      const res = await axios.post(
        "http://localhost:5000/api/courses/upload/video",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      setFormData((prev) => ({ ...prev, video: res.data.url }));
      alert("✅ Video uploaded successfully");
    } catch (err) {
      console.error("Video upload failed", err);
      alert("❌ Video upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const changedFields = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      });

      await axios.patch(
        `http://localhost:5000/api/courses/${courseId}`,
        changedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Course updated successfully!");
      navigate("/instructor-dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating course");
    }
  };

  // --- Quiz Handlers ---
  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz._id);
    setQuizForm({
      title: quiz.title,
      questions: quiz.questions.length
        ? quiz.questions
        : [{ question: "", options: ["", ""], answer: "" }],
    });
  };

  const handleAddQuiz = () => {
    setEditingQuizId("new");
    setQuizForm({
      title: "",
      questions: [{ question: "", options: ["", ""], answer: "" }],
    });
  };

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (qIdx, field, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIdx][field] = value;
    setQuizForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIdx].options[optIdx] = value;
    setQuizForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", options: ["", ""], answer: "" },
      ],
    }));
  };

  const handleSaveQuiz = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as instructor");
      return;
    }

    // Validation
    if (!quizForm.title.trim()) {
      alert("Quiz title is required");
      return;
    }
    for (const q of quizForm.questions) {
      if (!q.question.trim()) {
        alert("Each question must have text");
        return;
      }
      if (q.options.length < 2) {
        alert("Each question must have at least 2 options");
        return;
      }
      if (!q.answer.trim()) {
        alert("Each question must have a correct answer");
        return;
      }
    }

    const payload = {
      title: quizForm.title,
      questions: quizForm.questions.map((q) => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
      })),
    };

    let res;

    if (editingQuizId && editingQuizId !== "new") {
      // ✅ Edit existing quiz
      res = await axios.put(
        `http://localhost:5000/api/courses/${courseId}/quiz/${editingQuizId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // ✅ Add new quiz
      res = await axios.post(
        `http://localhost:5000/api/courses/${courseId}/quiz`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    alert("Quiz saved successfully");

    // ✅ Fetch fresh quizzes from backend
    const updated = await axios.get(
      `http://localhost:5000/api/courses/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setQuizzes(updated.data.quizzes || []);

    // Reset form
    setQuizForm({
      title: "",
      questions: [{ question: "", options: ["", ""], answer: "" }],
    });
    setEditingQuizId(null);
  } catch (err) {
    console.error("Save quiz error:", err.response?.data || err.message);
    alert("Failed to save quiz: " + (err.response?.data?.message || err.message));
  }
};


  const handleCancelQuiz = () => {
    setEditingQuizId(null);
    setQuizForm({
      title: "",
      questions: [{ question: "", options: ["", ""], answer: "" }],
    });
  };

  return (
    <>
    <Instructornavbar/>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-[25%] w-full bg-white border-r p-6">
          <button
            onClick={() => navigate("/instructor-dashboard")}
            className="flex items-center gap-2 text-[#147b96] font-semibold hover:underline mb-6"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>

        <div className="md:w-[75%] w-full bg-[#e8f2f7] p-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#147b96] mb-1">
              Edit Course
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="title"
                value={formData?.title || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Course title"
              />
              <input
                type="text"
                name="moduleName"
                value={formData?.moduleName || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Module Name"
              />
              <input
                type="text"
                name="lessonName"
                value={formData?.lessonName || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Lesson Name"
              />
              <input
                type="text"
                name="duration"
                value={formData?.duration || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Duration"
              />
              <input
                type="text"
                name="category"
                value={formData?.category || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Category"
              />
              <input
                type="text"
                name="language"
                value={formData?.language || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Language"
              />
              <input
                type="text"
                name="price"
                value={formData?.price || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Price"
              />
              <input
                type="text"
                name="oldPrice"
                value={formData?.oldPrice || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Old Price"
              />
              <input
                type="text"
                name="thumbnail"
                value={formData?.thumbnail || ""}
                onChange={handleChange}
                className="p-2 border rounded md:col-span-2"
                placeholder="Thumbnail URL"
              />
              <textarea
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                className="p-2 border rounded md:col-span-2"
                placeholder="Course Description"
              />

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium">
                  Upload Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFile}
                  className="w-full border-1 border-black rounded-md p-2"
                />
                {uploading && (
                  <div className="text-sm text-gray-600">
                    Uploading: {uploadProgress}%
                  </div>
                )}
                {formData.video && (
                  <div className="mt-2 text-sm">
                    <div>Uploaded URL:</div>
                    <a
                      href={formData.video}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline break-words"
                    >
                      {formData.video}
                    </a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#1faacb] hover:bg-[#159ab4] text-white px-6 py-2 rounded-md md:col-span-2"
              >
                Save Now
              </button>
            </form>

            {/* Quizzes Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#147b96]">Quizzes</h3>
                <button
                  onClick={handleAddQuiz}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  <FaPlus /> Add Quiz
                </button>
              </div>

              {editingQuizId ? (
                <div className="p-4 bg-gray-100 rounded space-y-2 mb-4">
                  <input
                    type="text"
                    name="title"
                    value={quizForm.title}
                    onChange={handleQuizChange}
                    className="p-2 border rounded w-full"
                    placeholder="Quiz Title"
                  />

                  {quizForm.questions.map((q, idx) => (
                    <div key={idx} className="border p-2 rounded mb-2">
                      <input
                        type="text"
                        placeholder="Question"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(idx, "question", e.target.value)
                        }
                        className="w-full p-2 border rounded mb-1"
                      />
                      {q.options.map((opt, i) => (
                        <input
                          key={i}
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(idx, i, e.target.value)
                          }
                          className="w-full p-2 border rounded mb-1"
                        />
                      ))}
                      <input
                        type="text"
                        placeholder="Correct Answer"
                        value={q.answer}
                        onChange={(e) =>
                          handleQuestionChange(idx, "answer", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    ➕ Add Question
                  </button>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleSaveQuiz}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelQuiz}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

              {quizzes.length === 0 ? (
                <p className="text-gray-500">No quizzes uploaded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {quizzes.map((quiz) => (
                    <li
                      key={quiz._id}
                      className="flex justify-between items-center bg-gray-100 p-3 rounded"
                    >
                      <span>{quiz.title}</span>
                      <button
                        onClick={() => handleEditQuiz(quiz)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        <FaEdit /> Edit
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Instructoredit;
