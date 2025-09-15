import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/my", protect, getMyNotifications);

export default router;
