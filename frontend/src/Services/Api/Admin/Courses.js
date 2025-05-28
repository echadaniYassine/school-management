import { axiosClient } from "../../../Api/axios";

const getPrefix = (role) => {
  if (role === 'student') return '/student';
  if (role === 'teacher') return '/teacher';
  return '/admin';
};

const CoursesApi = {
  getAll: async (params = {}, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/courses`, { params });
  },


  getById: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/courses/${id}`);
  },

  create: async (payload, role = 'admin') => {
    const prefix = getPrefix(role);
    const backendPayload = { ...payload };
    if (backendPayload.thumbnailUrl !== undefined) {
      backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
      delete backendPayload.thumbnailUrl;
    }
    backendPayload.category_id = payload.category_id || null;
    return await axiosClient.post(`${prefix}/courses`, backendPayload);
  },

  update: async (id, payload, role = 'admin') => {
    const prefix = getPrefix(role);
    const backendPayload = { ...payload };
    if (backendPayload.thumbnailUrl !== undefined) {
      backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
      delete backendPayload.thumbnailUrl;
    }
    backendPayload.category_id = payload.category_id || null;
    return await axiosClient.put(`${prefix}/courses/${id}`, backendPayload);
  },

  delete: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.delete(`${prefix}/courses/${id}`);
  },
};

export const CategoriesApi = {
  getAll: async () => {
    return await axiosClient.get('/admin/categories');
  },
};

export default CoursesApi;
