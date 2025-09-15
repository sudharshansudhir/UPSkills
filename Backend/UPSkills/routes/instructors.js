import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Fetch only instructors
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }); // filter by role
    res.status(200).json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching instructors" });
  }
});

export default router;
