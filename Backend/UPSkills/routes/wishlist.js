import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/:courseId", protect, removeFromWishlist);

export default router;
