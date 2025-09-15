import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all reviews for a course
router.get("/:id/reviews", getReviews);

// POST a review (only logged in users)
router.post("/:id/reviews", protect, addReview);

export default router;
