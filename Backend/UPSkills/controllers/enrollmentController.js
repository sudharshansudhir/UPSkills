import Course from "../models/Course.js";
import User from "../models/User.js";

// Student enrolls in a course
export const enrollStudent = async (req, res) => {
  try {
    const courseId = req.params.id; // ✅ Correct
    const studentId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check already enrolled
    if (course.enrolledStudents.find((s) => s.student.toString() === studentId.toString())) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // add student to course with progress tracking
    course.enrolledStudents.push({ 
      student: studentId, 
      progress: { completedLessons: 0, totalLessons: course.lessons.length } 
    });
    await course.save();

    // update user enrolledCourses
    const user = await User.findById(studentId);
    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Enrolled successfully", course, user });
  } catch (err) {
    console.error("❌ enrollStudent error:", err);
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};

// Get student's current course
export const getCurrentCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("currentCourse");
    if (!user.currentCourse) {
      return res.status(404).json({ message: "No current course" });
    }
    res.json(user.currentCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch current course" });
  }
};

// Instructor get students of a course
export const getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params; // courseId
    const course = await Course.findById(id)
      .populate("enrolledStudents.student", "name email _id image");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.enrolledStudents);
  } catch (err) {
    console.error("❌ getCourseStudents error:", err);
    res.status(500).json({ message: "Failed to fetch students", error: err.message });
  }
};

// Get all courses student enrolled in
export const getMyEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("enrolledCourses");
    res.json(user.enrolledCourses);
  } catch (err) {
    console.error("❌ getMyEnrolledCourses error:", err);
    res.status(500).json({ message: "Failed to fetch enrolled courses", error: err.message });
  }
};
