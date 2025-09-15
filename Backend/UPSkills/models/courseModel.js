// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // populate panna use aagum
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   thumbnail: String,
//   instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   students: [
//     {
//       student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       enrolledAt: { type: Date, default: Date.now },
//     },
//   ],
//   reviews: [reviewSchema],
// });

// // 👇 Fix: reuse model if already compiled
// export default mongoose.models.Course || mongoose.model("Course", courseSchema);
