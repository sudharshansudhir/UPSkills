import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext.jsx"   // ✅ add this

import HomePage from './pages/HomePage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminInstructors from './pages/AdminInstructors.jsx'
import AdminStudents from './pages/AdminStudents.jsx'
import Explore from './pages/Explore.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import Checkout from './pages/Checkout.jsx'
import InstructorUpload from './pages/InstructorUpload.jsx'
import Instructoredit from './pages/Instructoredit.jsx'
import Instructordashboard from './pages/Instructordashboard.jsx'
import InstructorStudents from './pages/InstructorStudents.jsx'
import UserProfile from './pages/UserProfile.jsx'
import InstructorProfile from './pages/InstructorProfile.jsx'
import Transactions from './pages/Transactions.jsx'
import QuizPage from './pages/Quizpage.jsx'
import QuizCreate from './pages/Quizcreate.jsx'
import QuizResults from './pages/Quizresults.jsx'
import CurrentCourse from './pages/CurrentCourse.jsx'
import Forgot from './pages/Forgot.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/aboutus", element: <AboutUs /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/courses", element: <Courses /> },
  { path: "/coursedetails/:courseId", element: <CourseDetails /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/admindashboard", element: <AdminDashboard /> },
  { path: "/admin-instructors", element: <AdminInstructors /> },
  { path: "/admin-students", element: <AdminStudents /> },
  { path: "/explore", element: <Explore /> },
  { path: "/notifications", element: <NotificationPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/instructor-dashboard", element: <Instructordashboard /> },
  { path: "/instructor-upload", element: <InstructorUpload /> },
  { path: "/instructor-edit/:id", element: <Instructoredit /> },
  { path: "/instructor-students", element: <InstructorStudents /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "/profile-instructor", element: <InstructorProfile /> },
  { path: "/admin-transactions", element: <Transactions /> },
  { path: "/student-quiz/:id", element: <QuizPage /> },
  { path: "/quiz-create", element: <QuizCreate /> },
  { path: "/quiz-results/:id", element: <QuizResults /> },
  { path: "/currentcourse/:id", element: <CurrentCourse /> },
  { path: "/forgotpassword", element: <Forgot /> },
  { path: "/reset-password/:token", element: <ResetPassword/> },
  { path: "*", element: <App/> },
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
