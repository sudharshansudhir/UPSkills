import express from "express";
import { courseChat } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/course-chat", protect, courseChat);

export default router;
