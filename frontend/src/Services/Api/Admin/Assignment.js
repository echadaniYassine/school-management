// src/Services/Api/Admin/Assignment.js (or a more general path)
import { axiosClient } from "../../../Api/axios"; // Adjust path

const getApiPrefix = (role) => {
    switch (role) {
        case 'student': return '/student';
        case 'teacher': return '/teacher';
        case 'admin': return '/admin';
        default: return '/admin'; // Fallback or throw error
    }
};

const AssignmentApi = {
  getAll: (role = 'admin', params = {}) => { // Default role to admin if not provided
    const prefix = getApiPrefix(role);
    return axiosClient.get(`${prefix}/assignments`, { params });
  },

  getById: (id, role = 'admin') => {
    const prefix = getApiPrefix(role);
    return axiosClient.get(`${prefix}/assignments/${id}`);
  },

  create: (formData, role = 'admin') => {
    const prefix = getApiPrefix(role);
    // FormData is typically used with POST for creation
    return axiosClient.post(`${prefix}/assignments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // For updates with FormData, backend needs to handle POST with _method=PUT
  update: (id, formData, role = 'admin') => {
    const prefix = getApiPrefix(role);
    formData.append('_method', 'PUT'); // Common practice for FormData updates
    return axiosClient.post(`${prefix}/assignments/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: (id, role = 'admin') => {
    const prefix = getApiPrefix(role);
    return axiosClient.delete(`${prefix}/assignments/${id}`);
  },

  // Renamed from downloadInstructions to match backend route if it's general
  // Or keep as downloadInstructions if that's the specific endpoint name
  downloadInstructions: (assignmentId, role = 'admin') => {
    const prefix = getApiPrefix(role);
    // The backend route was /api/assignments/{assignment}/download
    // It implies the prefix is already handled or it's a public non-role-prefixed route
    // If it's role-prefixed:
    // return axiosClient.get(`${prefix}/assignments/${assignmentId}/download-instructions`, { responseType: 'blob' });
    // If it's a general public route as defined in api.php:
    return axiosClient.get(`/assignments/${assignmentId}/download`, { responseType: 'blob' });
  },
};

export default AssignmentApi;