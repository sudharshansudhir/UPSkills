import Wishlist from "../models/Wishlist.js";

// Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    res.json(wishlist ? wishlist.courses : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { courseId, title, image, category, duration, price } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, courses: [] });
    }

    // prevent duplicates
    if (!wishlist.courses.some((c) => c.courseId === courseId)) {
      wishlist.courses.push({ courseId, title, image, category, duration, price });
    }

    await wishlist.save();
    res.json(wishlist.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.courses = wishlist.courses.filter(c => c.courseId !== req.params.courseId);
    await wishlist.save();

    res.json(wishlist.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
