import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaCheckCircle,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import lina from "../assets/lina.png";
const API_BASE = import.meta.env.VITE_API_BASE;

const CourseCard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [inWishlist, setInWishlist] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Rating & feedback states
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/courses/${courseId}`
        );
        setCourseData(res.data);

        const reviewsRes = await axios.get(
          `${API_BASE}/api/courses/${courseId}/reviews`
        );
        setLocalReviews(reviewsRes.data);

        const token = localStorage.getItem("token");
        if (token) {
          const wishlistRes = await axios.get(
            `${API_BASE}/api/wishlist`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const exists = wishlistRes.data.some(
            (c) => c.courseId === res.data._id
          );
          setInWishlist(exists);

          const enrolledRes = await axios.get(
            `${API_BASE}/api/courses/me/enrolled-courses`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const enrolled = enrolledRes.data.some(
            (c) => c._id === res.data._id
          );
          setIsEnrolled(enrolled);
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch course failed:", err);
        setError("Course not found");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="p-6 text-center">Loading course...</p>;
  if (error) return <p className="p-6 text-center text-red-500">❌ {error}</p>;
  if (!courseData) return null;

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Please login to add to wishlist");
        navigate("/login");
        return;
      }
      await axios.post(
        `${API_BASE}/api/wishlist`,
        {
          courseId: courseData._id,
          title: courseData.title,
          image: courseData.thumbnail,
          category: courseData.category,
          duration: courseData.duration,
          price: courseData.price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInWishlist(true);
      alert("✅ Course added to wishlist!");
    } catch (err) {
      console.error("Add to wishlist failed", err);
      alert("❌ Could not add to wishlist");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || !feedback.trim()) {
      alert("⚠️ Please provide both rating and feedback");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/api/courses/${courseData._id}/reviews`,
        { rating, comment: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLocalReviews((prev) => [res.data.review, ...prev]);
      alert("✅ Review submitted successfully!");
      setRating(0);
      setFeedback("");
    } catch (err) {
      console.error("Submit review error:", err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {courseData.title}
            </h1>
            <p className="text-blue-600 text-sm sm:text-md font-medium">
              By {courseData.instructor?.name || "Instructor"}
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {courseData.description}
            </p>
          </div>
        );
    case "ratings":
  // Calculate average rating from reviews stored in DB
  const reviews = courseData.reviews || [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="bg-[#e8f1fd] rounded-xl p-4 sm:p-6 space-y-4 mt-6 w-full">
      <h3 className="text-lg sm:text-xl font-semibold">
        {averageRating.toFixed(1)} out of 5
      </h3>

      {/* Stars based on average */}
      <div className="flex items-center text-yellow-400 text-sm">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-3 text-gray-600 font-medium">
          {reviews.length > 0 ? `${reviews.length} reviews` : "No reviews yet"}
        </span>
      </div>
    </div>
  );

      case "reviews":
        return (
          <div className="space-y-4">
            {localReviews.length > 0 ? (
              localReviews.map((r, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-gray-200"
                >
                  {/* Reviewer Name */}
                  <p className="text-sm font-semibold text-gray-800">
  {r.name || "Anonymous"}
</p>


                  {/* Comment */}
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>

                  {/* Stars */}
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        );
      case "curriculum":
        return (
          <div>
            <p className="text-gray-700 text-sm sm:text-base">
              {courseData.curriculum ||
                "UPSkills LMS is an innovative learning management platform designed to help students build real-world skills through engaging, practical, and industry-relevant courses. Unlike traditional learning, UPSkills offers an interactive and flexible environment where students can access high-quality video lectures, quizzes, and assignments anytime, anywhere. The platform is built to foster collaboration and growth with features like live sessions, doubt-solving, and peer interaction, ensuring that every learner stays motivated and supported. With a wide range of courses in technology, design, business, and more, students not only gain knowledge but also receive certifications that add value to their careers. UPSkills bridges the gap between academic learning and professional success, empowering learners to upgrade themselves continuously and stay ahead in today’s competitive world."}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <img
          src={courseData.thumbnail || lina}
          alt={courseData.title}
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover"
        />
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {["overview", "ratings", "reviews", "curriculum"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-medium ${
                  activeTab === tab ? "bg-teal-500 text-white" : "bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img
              src={courseData.thumbnail || lina}
              alt="Course Preview"
              className="w-full h-[160px] sm:h-[180px] object-cover"
            />
            <div className="p-4 space-y-2">
              <p className="text-xl sm:text-2xl font-bold">
                ${courseData.price}{" "}
                <span className="line-through text-gray-400 text-sm sm:text-lg ml-2">
                  {courseData.oldPrice}
                </span>
              </p>

              <div className="flex flex-col gap-3 mt-4">
                {isEnrolled ? (
                  <>
                    <NavLink
                      to={`/currentcourse/${courseData._id}`}
                      className="bg-teal-600 text-white px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-xl rounded-md w-full text-center hover:bg-teal-700"
                    >
                      Go to Course
                    </NavLink>

                    {/* Rating & Feedback Form */}
                    <form
                      onSubmit={handleSubmitReview}
                      className="border border-gray-200 rounded-md p-3 space-y-3"
                    >
                      <p className="font-semibold text-sm sm:text-base">
                        Rate this course
                      </p>
                      <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={20}
                            className={`cursor-pointer ${
                              rating >= star
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback..."
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-teal-500 text-white px-4 py-2 rounded-md w-full hover:bg-teal-600 disabled:opacity-50"
                      >
                        {submitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  </>
                ) : (
                  <NavLink
                    to={`/checkout?courseId=${courseData._id}`}
                    state={{ courses: [courseData] }}
                    className="bg-teal-500 hover:border-black hover:border-2 text-white px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-xl rounded-md w-full text-center"
                  >
                    Buy Now
                  </NavLink>
                )}

                {inWishlist ? (
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md w-full hover:bg-teal-700"
                  >
                    Go to Wishlist
                  </button>
                ) : (
                  <button
                    onClick={handleAddToWishlist}
                    className="border border-teal-500 hover:border-black hover:border-2 px-4 py-2 rounded-md w-full"
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg">
              This Course includes
            </h3>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" /> Money Back Guarantee
            </p>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" /> Access on all devices
            </p>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" /> Certification of
              completion
            </p>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" />{" "}
              {courseData.modules?.length || 32} Modules
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg">Share this course</h3>
            <div className="flex flex-wrap gap-3 text-gray-500">
              <FaFacebook size={18} />
              <FaTwitter size={18} />
              <FaYoutube size={18} />
              <FaInstagram size={18} />
              <FaTelegram size={18} />
              <FaEnvelope size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
