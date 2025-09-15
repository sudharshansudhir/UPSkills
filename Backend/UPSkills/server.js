// server.js (only the parts you need to add/change)
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/testRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import wishlistRoutes from "./routes/wishlist.js";
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from "./routes/reviewRoutes.js";

import instructorsRoutes from "./routes/instructors.js";
import paymentRoutes from "./routes/paymentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
// import phonepeRoutes from "./routes/phonepeRoutes.js";



dotenv.config();

const app = express();

// --- create uploads/videos if not exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads", "videos");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api", adminRoutes);
app.use("/api/instructors", instructorsRoutes);
app.use('/api/users', userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/phonepe", phonepeRoutes);
// rest unchanged...



app.use("/api/notifications", notificationRoutes);

app.use("/api/courses", reviewRoutes);

// db + server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "upskills"
    });
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on", process.env.PORT || 5000)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
