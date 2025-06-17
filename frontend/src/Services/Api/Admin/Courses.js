// src/Services/Api/Admin/Courses.js (or a general path)
import { axiosClient } from "../../../Api/axios"; // Adjust path

const getAdminPrefix = () => '/admin'; // Courses CRUD is admin-only

const CoursesApi = {
  // Public routes for courses
  getAllPublic: (params = {}) => {
    return axiosClient.get('/courses', { params });
  },
  getByIdPublic: (courseId) => {
    return axiosClient.get(`/courses/${courseId}`);
  },

  // Admin routes for courses (CRUD)
  // 'role' param might be redundant if this API file is only for admin actions.
  getAllAdmin: (params = {}, role = 'admin') => { // role param can be removed if always admin
    const prefix = getAdminPrefix(); // Assuming Course CRUD is admin
    return axiosClient.get(`${prefix}/courses`, { params });
  },
  getByIdAdmin: (courseId, role = 'admin') => {
    const prefix = getAdminPrefix();
    return axiosClient.get(`${prefix}/courses/${courseId}`);
  },
  create: (payload, role = 'admin') => {
    const prefix = getAdminPrefix();
    // Transform camelCase to snake_case for backend if needed, e.g., thumbnailUrl
    const backendPayload = { ...payload };
    if (backendPayload.thumbnailUrl) {
      backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
      delete backendPayload.thumbnailUrl;
    }
    return axiosClient.post(`${prefix}/courses`, backendPayload);
  },
  update: (courseId, payload, role = 'admin') => {
    const prefix = getAdminPrefix();
    const backendPayload = { ...payload };
    if (backendPayload.thumbnailUrl) {
      backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
      delete backendPayload.thumbnailUrl;
    }
    return axiosClient.put(`${prefix}/courses/${courseId}`, backendPayload);
  },
  delete: (courseId, role = 'admin') => {
    const prefix = getAdminPrefix();
    return axiosClient.delete(`${prefix}/courses/${courseId}`);
  },
};
export default CoursesApi;