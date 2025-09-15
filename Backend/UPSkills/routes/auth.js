import express from "express";
import { registerUser, loginUser, getMe, updateUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { forgotPassword } from "../controllers/authController.js";
import { resetPassword } from "../controllers/authController.js"; // JWT check middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateUser); // ✅ new update route

// ✅ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✅ Reset Password
router.post("/reset-password/:token", resetPassword);
export default router;
