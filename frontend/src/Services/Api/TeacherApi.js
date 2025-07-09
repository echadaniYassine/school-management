// src/Services/Api/Admin/TeacherApi.js
import { axiosClient } from "../../Api/axios";

const TeacherApi = {
    // FIX: Get all users, but filter by role='teacher'
    all: async (params = {}) => {
        // Merge the role filter with any other existing params (like search or pagination)
        const requestParams = { ...params, role: 'teacher' };
        return await axiosClient.get('/admin/users', { params: requestParams });
    },

    // A 'teacher' is a 'user', so we use the user endpoints for CUD operations.
    // The backend policy will ensure only an admin can perform these actions.
    create: async (payload) => {
        // IMPORTANT: Ensure the payload includes 'role': 'teacher'
        const teacherPayload = { ...payload, role: 'teacher' };
        return await axiosClient.post('/admin/users', teacherPayload);
    },

    update: async (id, payload) => {
        return await axiosClient.put(`/admin/users/${id}`, payload);
    },

    delete: async (id) => {
        return await axiosClient.delete(`/admin/users/${id}`);
    },

    getById: async (id) => {
         return await axiosClient.get(`/admin/users/${id}`);
    }
};

export default TeacherApi;