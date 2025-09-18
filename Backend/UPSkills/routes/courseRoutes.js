import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  addReview,
  getCourseReviews
} from "../controllers/courseController.js";
import {
  createCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getEnrolledStudents,
  updateQuiz
} from "../controllers/courseController.js";
import { protect, isInstructor } from "../middleware/authMiddleware.js";
import { uploadVideoFile } from "../controllers/uploadController.js";
import { getMyEnrolledCourses } from "../controllers/enrollmentController.js";
import { addQuiz } from "../controllers/courseController.js";
// ...

// import { enrollStudent } from "../controllers/enrollmentController.js";

// router.post("/:id/enroll", protect, enrollStudent);

import {
  enrollStudent,
  getCurrentCourse,
  getCourseStudents
} from "../controllers/enrollmentController.js";

const router = express.Router();

// multer config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/videos")); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${uniqueSuffix}-${safeName}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files are allowed"), false);
  }
});

// Upload raw video
router.post("/upload/video", protect, isInstructor, upload.single("video"), uploadVideoFile);

// Enrollment
// router.post("/", protect, createCourse);

router.post("/:id/enroll", protect, enrollStudent);
router.get("/me/current-course", protect, getCurrentCourse);
router.get("/:id/students", protect, isInstructor, getCourseStudents);
router.get("/me/enrolled-courses", protect, getMyEnrolledCourses);
router.post("/:id/quiz",protect, isInstructor, addQuiz);
router.put("/:id/quiz/:quizId", protect, isInstructor, updateQuiz);
router.post("/", protect, createCourse);
router.get("/instructor/my-courses", protect, getInstructorCourses);
router.get("/:id", getCourseById);
router.patch("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);
router.get("/", getAllCourses);
router.post("/:id/reviews", protect, addReview);
router.get("/:id/reviews", getCourseReviews);
export default router;
