import Course from "../models/Course.js";
import User from "../models/User.js";
import Notification from "../models/Notifications.js";


// Instructor uploads course

export const createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user._id,
    });
    await course.save();

    // ✅ Notify all students
    const students = await User.find({ role: "student" });

    const notifs = students.map((s) => ({
      user: s._id,
      message: `New course "${course.title}" uploaded by ${req.user.name}`,
      type: "course",
      course: course._id,
    }));

    await Notification.insertMany(notifs);

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating course" });
  }
};



// Get all courses (students can view)
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student enrolls in course
export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyEnrolled = course.studentsEnrolled.find(
      (s) => s.student.toString() === req.user._id.toString()
    );

    if (!alreadyEnrolled) {
      course.studentsEnrolled.push({
        student: req.user._id,
        progress: { completedLessons: 0, totalLessons: 0 }
      });
      await course.save();
    }

    res.json({ message: "Enrolled successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

// Instructor - get own courses + enrolled students
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .populate("instructor", "name email");
    res.json(courses);
  } catch (e) {
    console.error("Error fetching instructor courses:", e);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only instructor can delete
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this course" });
    }

    // ✅ replace remove() with findByIdAndDelete
    await Course.findByIdAndDelete(id);

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("DELETE course error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Public route – get all courses for students
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name image");
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("studentsEnrolled.student", "name email role");

    if (!course) return res.status(404).json({ message: "Course not found" });

    // only instructor of this course can see
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(course.studentsEnrolled);
  } catch (err) {
    console.error("Get enrolled students error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// PATCH /api/courses/:courseId/progress
export const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { completedLessons, totalLessons } = req.body;
    const studentId = req.user._id; // from JWT

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrolledStudent = course.studentsEnrolled.find(
  (s) => s.student.toString() === studentId.toString()
);


    if (!enrolledStudent) {
      return res.status(400).json({ message: "You are not enrolled in this course" });
    }

    if (completedLessons !== undefined) {
      enrolledStudent.progress.completedLessons = completedLessons;
    }
    if (totalLessons !== undefined) {
      enrolledStudent.progress.totalLessons = totalLessons;
    }

    await course.save();

    res.json({ message: "Progress updated", progress: enrolledStudent.progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/courses/my-courses
export const getMyCourses = async (req, res) => {
  try {
    const studentId = req.user._id;

    const courses = await Course.find({
      "studentsEnrolled.student": studentId
    }).populate("instructor", "name email");

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Instructor uploads a lesson to a course
export const addLesson = async (req, res) => {
  try {
    const { id } = req.params; // course id
    const { title, content, quiz } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // only instructor of this course can add lessons
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const newLesson = { title, content, quiz };
    course.lessons.push(newLesson);

    // update totalLessons for enrolled students
    course.studentsEnrolled.forEach((s) => {
      s.progress.totalLessons = course.lessons.length;
    });

    await course.save();
    res.status(201).json({ message: "Lesson added", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/courses/:courseId/lessons/:lessonId/complete
export const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user._id; // logged in student

    // Find course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check student enrolled
    const enrolledStudent = course.studentsEnrolled.find(
      (s) => s.student.toString() === userId.toString()
    );
    if (!enrolledStudent) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    // Check lesson exists
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Increase completedLessons count (avoid duplicate increment)
    if (enrolledStudent.progress.completedLessons < course.lessons.length) {
      enrolledStudent.progress.completedLessons += 1;
    }

    await course.save();

    res.json({
      message: "Lesson marked as completed",
      progress: enrolledStudent.progress
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course); // quizzes included
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching course" });
  }
};



// PATCH /api/courses/:id  (Instructor can update)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to edit this course" });
    }

    // Update only changed fields
    Object.keys(req.body).forEach((key) => {
      course[key] = req.body[key];
    });

    await course.save();
    res.json({ message: "Course updated successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, questions } = req.body; // expect { title, questions }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Optional: check instructor ownership
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.quizzes.push({ title, questions });
    await course.save();

    res.status(201).json(course.quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding quiz" });
  }
};



export const updateQuiz = async (req, res) => {
  const { id, quizId } = req.params;
  const { title, questions } = req.body;

  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const quiz = course.quizzes.id(quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  quiz.title = title;
  quiz.questions = questions;

  await course.save();

  res.json(course);
};

// controllers/courseController.js



// GET /api/courses/:id/reviews
// GET /api/courses/:id/reviews
export const getCourseReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course.reviews); // send reviews directly
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// controllers/courseController.js
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // check if already reviewed
    const alreadyReviewed = course.reviews.some(
      (r) => r.user && r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Course already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    course.reviews.push(review);

    // recalc average
    course.numReviews = course.reviews.length;
    course.rating = course.reviews.reduce((acc, item) => acc + item.rating, 0) /
      course.reviews.length;

    await course.save();

    res.status(201).json({ message: "Review added", review});
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
