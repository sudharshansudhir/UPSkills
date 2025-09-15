import api from "./axios";
export const getUsers = () => api.get("/admin/users");
export const getCoursesAdmin = () => api.get("/admin/courses");
export const getUsersAnalytics = () => api.get("/admin/analytics/users");
export const getCoursesAnalytics = () => api.get("/admin/analytics/courses");
export const getProgressAnalytics = () => api.get("/admin/analytics/progress");
