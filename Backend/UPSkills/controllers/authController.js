// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// @desc Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, dob, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 By default, students are approved, instructors must wait
    const isApproved = role === "instructor" ? false : true;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      dob,
      address,
      isApproved,
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        dob: user.dob,
        address: user.address,
        isApproved: user.isApproved,
      },
      message:
        role === "instructor"
          ? "Registration successful. Wait for admin approval."
          : "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // DEFAULT ADMIN (demo). For production, use DB-stored admin credentials.
const DEFAULT_ADMIN = {
  id: process.env.DEFAULT_ADMIN_ID || "testadmin1",
  password: process.env.DEFAULT_ADMIN_PASSWORD || "admin@upskills",
  name: process.env.DEFAULT_ADMIN_NAME || "Site Admin",
};


    if (adminId === DEFAULT_ADMIN.id && password === DEFAULT_ADMIN.password) {
      // create a simple admin payload
      const adminUser = { _id: DEFAULT_ADMIN.id, role: "admin" };

      // generateToken is already defined earlier in this file (it expects user._id and user.role)
      const token = generateToken(adminUser);

      return res.json({
        token,
        user: {
          id: adminUser._id,
          name: DEFAULT_ADMIN.name,
          role: "admin",
        },
      });
    }

    return res.status(401).json({ message: "Invalid admin credentials" });
  } catch (err) {
    console.error("adminLogin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Block unapproved instructors
    if (user.role === "instructor" && !user.isApproved) {
      return res.status(403).json({ message: "Your account is pending admin approval." });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        dob: user.dob,
        address: user.address,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Me (Profile)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update User Profile
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min expiry
    await user.save();

    // Create reset link
    const resetUrl = `${process.env.FRONTEND_ORIGIN}/reset-password/${resetToken}`;

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const message = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await transporter.sendMail({
      from: `"UPSkills" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset",
      html: message,
    });

    res.json({ message: "Password reset link sent to your email ✅" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Reset Password
export const resetPassword = async (req, res) => {
  try {
    const resetTokenHash = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful ✅" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
