import { axiosClient } from "../../../Api/axios";

const getPrefix = (role) => {
  if (role === 'student') return '/student';
  if (role === 'teacher') return '/teacher';
  return '/admin';
};

const BlogPostApi = {
  getAll: async (params = {}) => {
    return await axiosClient.get('blog-posts', { params });
  },

  getById: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.get(`${prefix}/blog-posts/${id}`);
  },

  create: async (formData, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.post(`${prefix}/blog-posts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: async (id, formData, role = 'admin') => {
    formData.append('_method', 'PUT');
    const prefix = getPrefix(role);
    return await axiosClient.post(`${prefix}/blog-posts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: async (id, role = 'admin') => {
    const prefix = getPrefix(role);
    return await axiosClient.delete(`${prefix}/blog-posts/${id}`);
  },
};

export default BlogPostApi;
