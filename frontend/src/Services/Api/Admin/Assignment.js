// src/Api/AssignmentApi.js (or your path, e.g., src/Services/Api/Admin/Assignment.js)
import { axiosClient } from "../../../Api/axios"; // Adjust path as needed

const getPrefix = (role) => {
  if (role === 'student') return '/student';
  if (role === 'teacher') return '/teacher';
  return '/admin'; // Defaults to /admin
};

const AssignmentApi = {
  // Modified getAll to accept role as the first parameter
  getAll: async (role = 'admin', params = {}) => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/assignments`, { params });
  },

  getById: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/assignments/${id}`);
  },

  create: async (formData, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.post(`${prefix}/assignments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: async (id, formData, role = 'admin') => {
    formData.append('_method', 'PUT'); // PUT workaround for FormData
    const prefix = getPrefix(role);
    return await axiosClient.post(`${prefix}/assignments/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.delete(`${prefix}/assignments/${id}`);
  },

  downloadInstructions: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/assignments/${id}/download-instructions`, {
      responseType: 'blob',
    });
  },
};

export default AssignmentApi;