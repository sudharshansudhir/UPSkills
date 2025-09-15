import axios from "axios";
import crypto from "crypto";
import { phonepeConfig } from "../config/phonepe.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// ✅ Initiate Payment
export const initiatePayment = async (req, res) => {
  try {
    const { amount, orderId, redirectUrl, callbackUrl } = req.body;
    const userId = req.user._id;

    const payload = {
      merchantId: phonepeConfig.merchantId,
      merchantTransactionId: orderId,
      merchantUserId: userId.toString(),
      amount: Math.round(amount * 100), // paise
      redirectUrl,
      callbackUrl,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checksum = crypto
      .createHash("sha256")
      .update(payloadBase64 + "/pg/v1/pay" + phonepeConfig.saltKey)
      .digest("hex");
    const xVerify = `${checksum}###${phonepeConfig.saltIndex}`;

    const response = await axios.post(
      `${phonepeConfig.baseUrl}/pg/v1/pay`,
      { request: payloadBase64 },
      { headers: { "Content-Type": "application/json", "X-VERIFY": xVerify, "accept": "application/json" } }
    );

    res.json(response.data);
  } catch (err) {
    console.error("PhonePe initiate error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};

// ✅ Handle PhonePe Callback (after payment success/fail)
export const paymentCallback = async (req, res) => {
  try {
    const { code, merchantTransactionId } = req.body; // phonepe sends details
    console.log("📩 PhonePe Callback:", req.body);

    if (code === "PAYMENT_SUCCESS") {
      // Find courseId from orderId pattern (we used `${courseId}_${Date.now()}`)
      const courseId = merchantTransactionId.split("_")[0];
      const userId = req.user?._id || req.body.userId; // may need mapping from merchantUserId

      // 1. Add to Enrollment model
      const course = await Course.findById(courseId);
      const user = await User.findById(userId);

      if (course && user) {
        // Check if already enrolled
        const already = await Enrollment.findOne({ user: userId, course: courseId });
        if (!already) {
          const enroll = new Enrollment({ user: userId, course: courseId, email: user.email });
          await enroll.save();

          course.students.push({ student: userId });
          await course.save();

          user.enrolledCourses.push(courseId);
          await user.save();
        }
      }
    }

    // Redirect back to frontend
    return res.redirect("http://localhost:5173/payment-success");
  } catch (err) {
    console.error("PhonePe callback error:", err.message);
    res.status(500).json({ message: "Callback failed" });
  }
};
