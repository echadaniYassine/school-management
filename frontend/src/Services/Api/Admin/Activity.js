// src/Api/ActivityApi.js
import { axiosClient } from "../../../Api/axios"; // Adjust path as needed

const getPrefix = (role) => {
    if (role === 'student') return '/student';
    if (role === 'teacher') return '/teacher';
    return '/admin'; // Defaults to /admin
};

const ActivityApi = {
    getAll: async (role = 'admin') => { // Default role is 'admin'
        const prefix = getPrefix(role);
        return await axiosClient.get(`${prefix}/activities`);
    },
    getById: async (id, role = 'admin') => { // Default role is 'admin'
        const prefix = getPrefix(role);
        return await axiosClient.get(`${prefix}/activities/${id}`);
    },
    create: async (payload, role = 'admin') => { // Default role is 'admin'
        const prefix = getPrefix(role);
        return await axiosClient.post(`${prefix}/activities`, payload);
    },
    update: async (id, payload, role = 'admin') => { // Default role is 'admin'
        const prefix = getPrefix(role);
        return await axiosClient.put(`${prefix}/activities/${id}`, payload);
    },
    delete: async (id, role = 'admin') => { // Default role is 'admin'
        const prefix = getPrefix(role);
        return await axiosClient.delete(`${prefix}/activities/${id}`);
    },
};

export default ActivityApi;