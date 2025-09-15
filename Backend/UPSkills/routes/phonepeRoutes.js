import express from "express";
import axios from "axios";

const router = express.Router();

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const BUSINESS_ID = process.env.PHONEPE_BUSINESS_ID;

// 1. Get Access Token
const getAccessToken = async () => {
  const tokenUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox/oauth/token"; // Sandbox URL
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "client_credentials");

  const { data } = await axios.post(tokenUrl, params);
  return data.access_token;
};

// 2. Initiate Payment
router.post("/initiate", async (req, res) => {
  try {
    const { amount, orderId, redirectUrl, callbackUrl } = req.body;
    const accessToken = await getAccessToken();

    const payUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"; // sandbox

    const requestBody = {
      merchantId: BUSINESS_ID,
      merchantTransactionId: orderId,
      amount: amount * 100, // convert to paise if INR
      merchantUserId: "user_" + Date.now(),
      redirectUrl,
      callbackUrl,
    };

    const { data } = await axios.post(payUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    res.json(data); // will contain redirect url
  } catch (err) {
    console.error("PhonePe payment error:", err.response?.data || err.message);
    res.status(500).json({ error: "PhonePe payment failed" });
  }
});

// 3. Callback
router.post("/callback", async (req, res) => {
  const paymentData = req.body;
  console.log("📩 PhonePe callback:", paymentData);

  // Verify status, update DB, enroll student
  if (paymentData.success) {
    // ✅ mark enrollment success
  }

  res.json({ received: true });
});

export default router;

