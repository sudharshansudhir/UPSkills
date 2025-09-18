import express from "express";
import { 
  getAllUsers,
  getAllCourses,
  getUsersAnalytics,
  getCoursesAnalytics,
  getProgressAnalytics,
  getInstructorRequests,
  deleteUser,
  deleteCourse,
  adminLogin,
  getLatestStudents,
  getLatestInstructors,
  getStats
} from "../controllers/adminController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { approveInstructor, declineInstructor } from "../controllers/adminController.js";




const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", protect, authorize("admin"), getAllUsers);
router.get("/courses", protect, authorize("admin"), getAllCourses);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);
router.delete("/courses/:id", protect, authorize("admin"), deleteCourse);
router.get("/stats", getStats);

router.put("/approve-instructor/:id", protect, authorize("admin"), approveInstructor);
router.delete("/decline-instructor/:id", protect, authorize("admin"), declineInstructor);
// analytics
router.get("/analytics/users", protect, authorize("admin"), getUsersAnalytics);
router.get("/analytics/courses", protect, authorize("admin"), getCoursesAnalytics);
router.get("/analytics/progress", protect, authorize("admin"), getProgressAnalytics);

router.get("/latest-instructors", protect, authorize("admin"), getLatestInstructors);
router.get("/latest-students", protect, authorize("admin"), getLatestStudents);

// ✅ Add this
router.get("/pending-instructors", protect, authorize("admin"), getInstructorRequests);

export default router;
