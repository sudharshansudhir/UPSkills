import User from '../models/User.js';

// Fetch users, optionally filter by role
export const getUsers = async (req, res) => {
  try {
    const { role } = req.query; // ?role=student
    const query = role ? { role } : {};
    const users = await User.find(query); 
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
