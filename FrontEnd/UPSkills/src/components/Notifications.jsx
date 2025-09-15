import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await setNotifications([
  { msg: "New Course Uploaded from Instructor 1" },
  { msg: "New task updated for Course 3" },
  { msg: "Successfully got certified" },
  { msg: "New quiz added to Module 1 from Course 2" },
  { msg: "New Course Uploaded from Instructor 1" },
  { msg: "New task updated for Course 3" },
  { msg: "Successfully got certified" },
  { msg: "New quiz added to Module 1 from Course 2" },
  { msg: "New Course Uploaded from Instructor 1" },
  { msg: "New task updated for Course 3" },
  { msg: "Successfully got certified" },
  { msg: "New quiz added to Module 1 from Course 2" },
]);
;
        setNotifications(res.data); // Assuming: [{ msg: "New Course Uploaded" }]
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications", err);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 md:px-20 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
        Notifications
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications found</p>
      ) : (
        <div className="space-y-6">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-green-200 text-gray-900 px-6 py-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-green-300"
            >
              {note.msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
