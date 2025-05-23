// src/Api/BlogPostApi.js
import { axiosClient } from "../../../Api/axios"; // Your axios instance

const BlogPostApi = {
    getAll: async (params = {}) => { // params can include { page, search }
        return await axiosClient.get('/admin/blog-posts', { params });
    },
    getById: async (id) => {
        return await axiosClient.get(`/admin/blog-posts/${id}`);
    },
    create: async (formData) => { // Expects FormData
        return await axiosClient.post('/admin/blog-posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    update: async (id, formData) => { // Expects FormData, will contain _method: 'PUT'
        return await axiosClient.post(`/admin/blog-posts/${id}`, formData, { // POST for FormData with _method
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/blog-posts/${id}`);
    },
};
export default BlogPostApi;