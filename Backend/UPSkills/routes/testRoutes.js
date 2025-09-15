import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Any logged-in user can see
router.get("/student-area", protect, authorize("student"), (req, res) => {
  res.json({ message: `Welcome Student ${req.user.name}` });
});

// Only instructor can see
router.get("/instructor-area", protect, authorize("instructor"), (req, res) => {
  res.json({ message: `Welcome Instructor ${req.user.name}` });
});

// Only admin can see
router.get("/admin-area", protect, authorize("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

export default router;
