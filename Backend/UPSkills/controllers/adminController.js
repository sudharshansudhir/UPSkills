import User from "../models/User.js";
import Course from "../models/Course.js";
import jwt from "jsonwebtoken";


// Get all users (students + instructors + admins)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = (req, res) => {
  const { adminId, password } = req.body;

  const defaultAdmin = {
    id: "testadmin1",
    password: "admin@upskills",
  };

 if (adminId === defaultAdmin.id && password === defaultAdmin.password) {
  const token = jwt.sign(
    { adminId: defaultAdmin.id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return res.json({
    success: true,
    token,
    user: { // 🔑 match frontend expectation
      id: defaultAdmin.id,
      name: "Site Admin",
      role: "admin",
    },
  });
}
 else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
};



// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email role")
      .populate("studentsEnrolled", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Analytics → Users
export const getUsersAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: "student" });
    const instructors = await User.countDocuments({ role: "instructor" });
    const admins = await User.countDocuments({ role: "admin" });

    res.json({ totalUsers, students, instructors, admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Analytics → Courses
export const getCoursesAnalytics = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const courses = await Course.find();

    let totalEnrollments = 0;
    courses.forEach((c) => {
      totalEnrollments += (c.studentsEnrolled?.length || 0); // 🔑 safe
    });

    res.json({ totalCourses, totalEnrollments });
  } catch (err) {
    console.error("❌ getCoursesAnalytics error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Analytics → Progress
export const getProgressAnalytics = async (req, res) => {
  try {
    const courses = await Course.find().populate("studentsEnrolled");

    const data = courses.map((c) => {
      let totalCompleted = 0;
      const totalStudents = c.studentsEnrolled.length || 1;

      c.studentsEnrolled.forEach((s) => {
        // if progress exists on student object
        if (s.progress) {
          totalCompleted +=
            s.progress.completedLessons / (s.progress.totalLessons || 1);
        }
      });

      const avgCompletion = totalStudents
        ? Math.round((totalCompleted / totalStudents) * 100)
        : 0;

      return { course: c.title, avgCompletion: avgCompletion + "%" };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Optional) Fetch instructor requests → if you plan to approve instructors
export const getInstructorRequests = async (req, res) => {
  try {
    const pendingInstructors = await User.find({
      role: "instructor",
      isApproved: false,
    }).select("-password");

    res.json(pendingInstructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Approve instructor
export const approveInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    instructor.isApproved = true;
    await instructor.save();

    res.json({ message: "Instructor approved ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Decline instructor
export const declineInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    await instructor.deleteOne();
    res.json({ message: "Instructor declined ❌" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get latest instructors
export const getLatestInstructors = async (req, res) => {
  try {
    const latestInstructors = await User.find({ role: "instructor" })
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .select("-password");

    res.json(latestInstructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get latest students
export const getLatestStudents = async (req, res) => {
  try {
    const latestStudents = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    res.json(latestStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
