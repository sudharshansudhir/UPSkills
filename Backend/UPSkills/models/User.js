import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },
    phone: { type: String },
    dob: { type: Date },
    address: { type: String },
    image: { type: String },
    isApproved: { type: Boolean, default: false }, 

    // Wishlist courses
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

    // All enrolled courses
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

    // NEW: currently active course
    currentCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null
    },
    // 🔹 For password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
