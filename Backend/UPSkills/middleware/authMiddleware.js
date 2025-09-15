// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // --- Special Case: Static Admin ---
      if (decoded.adminId === "testadmin1") {
        req.user = {
          id: "testadmin1",
          name: "Site Admin",
          role: "admin",
        };
        return next();
      }

      // --- Normal DB Users ---
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("protect middleware error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// safer authorize check (avoid crash if req.user missing)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export const isInstructor = (req, res, next) => {
  if (!req.user || req.user.role !== "instructor") {
    return res.status(403).json({ message: "Only instructors can do this" });
  }
  next();
};
