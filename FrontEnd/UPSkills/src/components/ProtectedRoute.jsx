// components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!user) return <Navigate to="/login" />; // Not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />; // Not allowed

  return children;
};

export default ProtectedRoute;
