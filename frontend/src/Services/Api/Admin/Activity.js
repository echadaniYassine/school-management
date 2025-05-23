// src/Api/ActivityApi.js
import { axiosClient } from "../../../Api/axios"; // Adjust path as needed

const ActivityApi = {
    getAll: async () => {
        return await axiosClient.get('/admin/activities');
    },
    getById: async (id) => {
        return await axiosClient.get(`/admin/activities/${id}`);
    },
    create: async (payload) => {
        // Ensure payload matches what StoreActivityRequest expects
        return await axiosClient.post('/admin/activities', payload);
    },
    update: async (id, payload) => {
        // Ensure payload matches what UpdateActivityRequest expects
        return await axiosClient.put(`/admin/activities/${id}`, payload);
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/activities/${id}`);
    },
};
export default ActivityApi;