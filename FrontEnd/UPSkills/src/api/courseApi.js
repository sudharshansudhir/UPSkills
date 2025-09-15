import api from "./axios";
export const getCourses = () => api.get("/courses");
export const createCourse = (data) => api.post("/courses", data);
export const enrollCourse = (id) => api.post(`/courses/${id}/enroll`);
export const getMyCourses = () => api.get("/courses/my-courses");
export const addLesson = (courseId, data) => api.post(`/courses/${courseId}/lessons`, data);
export const markLessonComplete = (courseId, lessonId) =>
  api.patch(`/courses/${courseId}/lessons/${lessonId}/complete`);
