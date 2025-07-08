// src/Services/Api/Blog.js

import { axiosClient } from "../../Api/axios";

const getPrefix = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/teacher';
    return ''; // Public view
};

const BlogPostApi = {
    getAll: ({ role, params = {} }) => {
        const prefix = getPrefix(role);
        return axiosClient.get(`${prefix}/blog-posts`, { params });
    },
    create: ({ role, formData }) => {
        const prefix = getPrefix(role);
        return axiosClient.post(`${prefix}/blog-posts`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: ({ role, id, formData }) => {
        const prefix = getPrefix(role);
        formData.append('_method', 'PUT');
        return axiosClient.post(`${prefix}/blog-posts/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    delete: ({ role, id }) => {
        const prefix = getPrefix(role);
        return axiosClient.delete(`${prefix}/blog-posts/${id}`);
    },
};

export default BlogPostApi;