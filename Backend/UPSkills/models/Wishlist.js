import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      courseId: { type: String, required: true },
      title: String,
      image: String,
      category: String,
      duration: String,
      price: Number,
    }
  ],
});

export default mongoose.model("Wishlist", wishlistSchema);
