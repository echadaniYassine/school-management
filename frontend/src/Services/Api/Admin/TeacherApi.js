// src/Services/Api/Admin/TeacherApi.js
import { axiosClient } from "../../../Api/axios"; // Ensure this path is correct

const TeacherApi = {
    create: async (payload) => {
        return await axiosClient.post('/admin/teachers', payload);
    },
    update: async (id, payload) => {
        // Backend expects PUT, but axiosClient.put might not send ID in body like your example
        // It's usually /admin/teachers/{id} with payload in body
        return await axiosClient.put(`/admin/teachers/${id}`, payload);
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/teachers/${id}`);
    },
    all: async (params = {}) => { // Added params for potential pagination/filtering
        return await axiosClient.get('/admin/teachers', { params });
    },
    getById: async (id) => { // Optional: if you need to fetch a single teacher
         return await axiosClient.get(`/admin/teachers/${id}`);
    }
};
export default TeacherApi;