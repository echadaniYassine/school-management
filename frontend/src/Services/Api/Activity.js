// src/Services/Api/Activity.js

import { axiosClient } from "../../Api/axios";

// Helper function to determine the API endpoint prefix based on role
const getPrefix = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/teacher';
    return ''; // Default for public/guest access if any
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
    * NOTE: If your UpsertActivityForm sends files, you will need to
    * use the FormData with _method override trick here as well.
    * For simplicity, this example assumes JSON data for PUT.
    *
    * @param {object} options - { role, id, payload }
    */
    update: ({ role, id, payload }) => {
        const prefix = getPrefix(role);
        return axiosClient.put(`${prefix}/activities/${id}`, payload);
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