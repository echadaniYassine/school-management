import { axiosClient } from "../../../Api/axios";

const getPrefix = (role) => {
  if (role === 'student') return '/student';
  if (role === 'teacher') return '/teacher';
  return '/admin';
};

const AssignmentApi = {
  getAll: async (params = {}) => {
    return await axiosClient.get('assignments', { params });
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
