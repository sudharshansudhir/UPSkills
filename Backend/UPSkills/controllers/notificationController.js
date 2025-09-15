import Notification from "../models/Notifications.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifs);
  } catch (err) {
    console.error("getMyNotifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
