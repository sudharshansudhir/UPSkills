// models/userModel.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  enrolledCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      enrolledAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);
