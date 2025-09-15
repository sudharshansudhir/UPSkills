import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String }],
      answer: { type: String, required: true },
    },
  ],
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ correct ref
  name: { type: String, required: true }, // store username
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  moduleName: { type: String },
  lessonName: { type: String },
  duration: { type: String },
  video: { type: String },
  thumbnail: { type: String },
  resources: { type: String },
  description: { type: String },
  language: { type: String },
  category: { type: String },
  price: { type: String },
  oldPrice: { type: String },

  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // List of enrolled students with timestamp
  enrolledStudents: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      enrolledAt: { type: Date, default: Date.now },
      progress: { completedLessons: { type: Number, default: 0 }, totalLessons: { type: Number, default: 0 } },
    }
  ],

  lessons: [
    {
      title: String,
      content: String,
      quiz: String
    }
  ],
  quizzes: [quizSchema], 
    reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
      name: { type: String  },
      rating: { type: Number},
      comment: { type: String },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
