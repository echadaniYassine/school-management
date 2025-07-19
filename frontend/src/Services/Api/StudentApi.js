// src/Services/Api/StudentApi.js
import { axiosClient } from "../../Api/axios";

const StudentApi = {
    // FIX: Get all users, but filter by role='student'
    all: async (params = {}) => {
        const requestParams = { ...params, role: 'student' };
        return await axiosClient.get('/admin/users', { params: requestParams });
    },

    // A 'student' is a 'user'.
    create: async (payload) => {
        const studentPayload = { ...payload, role: 'student' };
        return await axiosClient.post('/admin/users', studentPayload);
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

export default StudentApi;