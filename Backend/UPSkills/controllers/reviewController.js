import Course from "../models/courseModel.js";

// ⭐ Add a review
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user already reviewed
    const alreadyReviewed = course.reviews.find(
      (r) => r.student.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this course" });
    }

    // Push new review
    course.reviews.push({
      student: req.user._id,
      rating,
      comment,
    });

    await course.save();

    // Re-fetch populated reviews for response
    const updatedCourse = await Course.findById(id).populate({
      path: "reviews.student",
      select: "name email",
    });

    const newReview = updatedCourse.reviews.slice(-1)[0]; // last review
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ⭐ Get all reviews for a course
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate({
      path: "reviews.student",
      select: "name email",
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
