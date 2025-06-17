// src/Services/Api/Admin/Blog.js (or a more general path)
import { axiosClient } from "../../../Api/axios"; // Adjust path

const getApiPrefix = (role) => {
    // Only admin can create/update/delete blog posts as per backend policies
    if (role === 'admin') return '/admin';
    // For viewing, it might be public or role-specific. Let's assume admin for CRUD.
    // Public viewing will hit non-prefixed endpoints.
    return ''; // Default for public or non-admin actions
};

const BlogPostApi = {
  // Public getAll (hits /api/blog-posts)
  getAllPublic: (params = {}) => {
    return axiosClient.get('/blog-posts', { params });
  },
  // Public getById (hits /api/blog-posts/{id})
  getByIdPublic: (id) => {
    return axiosClient.get(`/blog-posts/${id}`);
  },

  // Admin CRUD operations
  getAllAdmin: (params = {}, role = 'admin') => { // Role might be redundant if always admin
    const prefix = getApiPrefix(role);
    return axiosClient.get(`${prefix}/blog-posts`, { params });
  },
  getByIdAdmin: (id, role = 'admin') => {
    const prefix = getApiPrefix(role);
    return axiosClient.get(`${prefix}/blog-posts/${id}`);
  },
  create: (formData, role = 'admin') => { // Role is 'admin' for creation
    const prefix = getApiPrefix(role);
    return axiosClient.post(`${prefix}/blog-posts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (id, formData, role = 'admin') => { // Role is 'admin' for update
    const prefix = getApiPrefix(role);
    formData.append('_method', 'PUT');
    return axiosClient.post(`${prefix}/blog-posts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id, role = 'admin') => { // Role is 'admin' for deletion
    const prefix = getApiPrefix(role);
    return axiosClient.delete(`${prefix}/blog-posts/${id}`);
  },
};
export default BlogPostApi;