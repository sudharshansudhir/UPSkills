import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [selectedCourses, setSelectedCourses] = useState(location.state?.courses || []);
  const [loading, setLoading] = useState(!selectedCourses.length);
  const [error, setError] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const validCoupons = {
    SAVE10: 10,
    SAVE20: 20,
    UPSKILLS50: 50,
    FREE100: 100,
  };

  useEffect(() => {
    if (selectedCourses.length === 0 && courseId) {
      const fetchCourse = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
          setSelectedCourses([res.data]);
        } catch (err) {
          console.error("Failed to fetch course:", err);
          setError("Course not found");
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [courseId, selectedCourses.length]);

  if (loading) return <p className="p-10 text-center">Loading course...</p>;
  if (error || selectedCourses.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        ❌ {error || "No course selected for checkout."}
      </div>
    );

  const subtotal = selectedCourses.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );
  const tax = 1;
  const total = (subtotal - (subtotal * discount) / 100 + tax).toFixed(2);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (validCoupons[code]) {
      setDiscount(validCoupons[code]);
      setCouponMsg(`✅ Coupon applied! You got ${validCoupons[code]}% off.`);
    } else {
      setDiscount(0);
      setCouponMsg("❌ Invalid coupon code.");
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Please login first");
        return;
      }

      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_RGznKpzpI90Pdg",
        amount: order.amount,
        currency: order.currency,
        name: "UPSkills",
        description: "Course Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                orderId: order.id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            await axios.post(
              `http://localhost:5000/api/courses/${courseId}/enroll`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("✅ Payment Successful & Course Enrolled!");
            navigate(`/currentcourse/${courseId}`);
          } catch (err) {
            console.error("❌ Error during enrollment:", err);
            alert("❌ Payment Verification or Enrollment Failed");
          }
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: "9876543210",
        },
        theme: { color: "#2ec4b6" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert("❌ Payment failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 justify-center">
      {/* Summary (now contains Pay button also) */}
      <div className="bg-blue-50 rounded-lg p-6 w-full md:w-[400px] h-fit">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="space-y-4 mb-4">
          {selectedCourses.map((course, idx) => (
            <div key={idx} className="flex gap-4 items-center border-b pb-4">
              <img
                src={course.thumbnail || course.image}
                alt={course.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{course.title}</p>
                <p className="text-sm font-semibold mt-1">₹{course.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Apply Coupon</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none"
            />
            <button
              onClick={applyCoupon}
              type="button"
              className="px-4 py-2 bg-[#2ec4b6] text-white rounded hover:bg-[#29b1a3] transition-all"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className={`mt-2 text-sm ${discount > 0 ? "text-green-600" : "text-red-500"}`}>
              {couponMsg}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <div className="flex justify-between"><p>Subtotal</p><p>₹{subtotal.toFixed(2)}</p></div>
          <div className="flex justify-between"><p>Discount</p><p>{discount}%</p></div>
          <div className="flex justify-between"><p>Tax</p><p>₹{tax}</p></div>
          <hr />
          <div className="flex justify-between font-bold text-base pt-2"><p>Total</p><p>₹{total}</p></div>
        </div>

        {/* Pay Button moved here */}
        <button
          onClick={handlePayment}
          className="w-full bg-[#2ec4b6] text-white py-3 rounded hover:bg-[#29b1a3] transition-all"
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
};

export default Payment;
