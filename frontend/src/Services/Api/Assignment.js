// src/Services/Api/Assignment.js

import { axiosClient } from "../../Api/axios";

// Helper function to determine the API endpoint prefix based on role
const getPrefix = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/teacher';
    return ''; // Default prefix
};

const AssignmentApi = {
    /**
     * @param {object} options - { role, params }
     */
    getAll: ({ role, params = {} }) => {
        const prefix = getPrefix(role);
        return axiosClient.get(`${prefix}/assignments`, { params });
    },

    /**
     * @param {object} options - { role, formData }
     */
    create: ({ role, formData }) => {
        const prefix = getPrefix(role);
        // Use POST for creation with multipart/form-data
        return axiosClient.post(`${prefix}/assignments`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    /**
     * @param {object} options - { role, id, formData }
     */
    update: ({ role, id, formData }) => {
        const prefix = getPrefix(role);
        // Use POST with a _method override for multipart/form-data updates
        formData.append('_method', 'PUT');
        return axiosClient.post(`${prefix}/assignments/${id}`, formData, {
             headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    /**
     * @param {object} options - { role, id }
     */
    delete: ({ role, id }) => {
        const prefix = getPrefix(role);
        return axiosClient.delete(`${prefix}/assignments/${id}`);
    },

    /**
     * @param {object} options - { role, id }
     */
    downloadInstructions: ({ role, id }) => {
        const prefix = getPrefix(role);
        return axiosClient.get(`${prefix}/assignments/${id}/download`, {
            responseType: 'blob', // Important for file downloads
        });
    },
};

export default AssignmentApi;