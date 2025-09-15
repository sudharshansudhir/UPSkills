// controllers/paymentController.js
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
  try {
    const { courseId, userId, email } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({ message: "CourseId or UserId missing" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Save enrollment
    const newEnroll = new Enrollment({
      user: userId,
      course: courseId,
      email: email,
    });
    await newEnroll.save();

    res.status(200).json({ message: "Enrollment successful", newEnroll });
  } catch (error) {
    console.error("Enroll error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
