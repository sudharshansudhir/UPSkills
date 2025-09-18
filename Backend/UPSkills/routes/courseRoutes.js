import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  addReview,
  getCourseReviews,
  createCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getEnrolledStudents,
  updateQuiz,
  addQuiz
} from "../controllers/courseController.js";
import { protect, isInstructor } from "../middleware/authMiddleware.js";
import {
  enrollStudent,
  getCurrentCourse,
  getCourseStudents
} from "../controllers/enrollmentController.js";

const router = express.Router();

// ✅ Cloudinary Storage for Videos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upskills/videos",       // folder in Cloudinary
    resource_type: "video",          // important for mp4/webm
    public_id: (req, file) => Date.now() + "-" + file.originalname.replace(/\s+/g, "-"),
  },
});

const upload = multer({ storage });

// ✅ Upload video route
router.post(
  "/upload/video",
  protect,
  isInstructor,
  upload.single("video"),
  (req, res) => {
    try {
      // Cloudinary automatically gives secure URL
      res.json({ url: req.file.path });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Video upload failed" });
    }
  }
);

// Enrollment
router.post("/:id/enroll", protect, enrollStudent);
router.get("/me/current-course", protect, getCurrentCourse);
router.get("/:id/students", protect, isInstructor, getCourseStudents);
router.get("/me/enrolled-courses", protect, getEnrolledStudents);
router.post("/:id/quiz", protect, isInstructor, addQuiz);
router.put("/:id/quiz/:quizId", protect, isInstructor, updateQuiz);

// Course CRUD
router.post("/", protect, createCourse);
router.get("/instructor/my-courses", protect, getInstructorCourses);
router.get("/:id", getCourseById);
router.patch("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);
router.get("/", getAllCourses);

// Reviews
router.post("/:id/reviews", protect, addReview);
router.get("/:id/reviews", getCourseReviews);

export default router;
