// src/Services/Api/Admin/Courses.js
import { axiosClient } from "../../../Api/axios"; // Adjust path as needed

const CoursesApi = {
    getAll: async (params) => {
        return await axiosClient.get('/admin/courses', { params });
    },
    getById: async (id) => {
        return await axiosClient.get(`/admin/courses/${id}`);
    },
    create: async (payload) => {
        const backendPayload = { ...payload };
        if (backendPayload.thumbnailUrl !== undefined) { // Map to snake_case for backend
            backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
            delete backendPayload.thumbnailUrl;
        }
        // Ensure category_id is present, even if null
        backendPayload.category_id = payload.category_id || null;
        return await axiosClient.post('/admin/courses', backendPayload);
    },
    update: async (id, payload) => {
        const backendPayload = { ...payload };
        if (backendPayload.thumbnailUrl !== undefined) { // Map to snake_case for backend
            backendPayload.thumbnail_url = backendPayload.thumbnailUrl;
            delete backendPayload.thumbnailUrl;
        }
        // Ensure category_id is present, even if null
        backendPayload.category_id = payload.category_id || null;
        return await axiosClient.put(`/admin/courses/${id}`, backendPayload);
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/courses/${id}`);
    }
};

export const CategoriesApi = {
    getAll: async () => {
        return await axiosClient.get('/admin/categories');
    }
};

export default CoursesApi;