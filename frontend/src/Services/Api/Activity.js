// src/Services/Api/Activity.js

import { axiosClient } from "../../Api/axios";

// Helper function to determine the API endpoint prefix based on role
const getPrefix = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/teacher';
    return ''; // Public view
};

const ActivityApi = {
    /**
     * @param {object} options - { role, params }
     */
    getAll: ({ role, params = {} }) => {
        const prefix = getPrefix(role);
        return axiosClient.get(`${prefix}/activities`, { params });
    },

    /**
     * @param {object} options - { role, formData }
     */
    create: ({ role, formData }) => {
        const prefix = getPrefix(role);
        return axiosClient.post(`${prefix}/activities`, formData);
    },

    /**
     * @param {object} options - { role, id, formData }
     */
    update: ({ role, id, formData }) => {
        const prefix = getPrefix(role);
        // Note: If your form sends files, you'll need the _method override trick
        return axiosClient.put(`${prefix}/activities/${id}`, formData);
    },

    /**
     * @param {object} options - { role, id }
     */
    delete: ({ role, id }) => {
        const prefix = getPrefix(role);
        return axiosClient.delete(`${prefix}/activities/${id}`);
    },
};

export default ActivityApi;