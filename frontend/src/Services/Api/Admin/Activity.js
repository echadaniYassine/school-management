// Example: src/Services/Api/ActivityApi.js
import { axiosClient } from "../../../Api/axios"; // Adjust path to your central axiosClient

// Centralized prefix logic if not handled by backend routes explicitly
const getApiPrefix = (role) => {
    switch (role) {
        case 'student': return '/student';
        case 'teacher': return '/teacher';
        case 'admin': return '/admin';
        default: return ''; // For public routes or if prefix is part of the path
    }
};

const ActivityApi = {
    // If role determines the endpoint prefix:
    getAll: async (role, params = {}) => {
        const prefix = getApiPrefix(role);
        // Ensure params are correctly passed for GET requests
        return axiosClient.get(`${prefix}/activities`, { params });
    },
    getById: async (id, role) => {
        const prefix = getApiPrefix(role);
        return axiosClient.get(`${prefix}/activities/${id}`);
    },
    create: async (payload, role) => {
        const prefix = getApiPrefix(role);
        return axiosClient.post(`${prefix}/activities`, payload);
    },
    update: async (id, payload, role) => {
        const prefix = getApiPrefix(role);
        // For FormData with PUT, it's common to use POST and append _method: 'PUT'
        // If not using FormData, axiosClient.put should work fine.
        if (payload instanceof FormData) {
            payload.append('_method', 'PUT');
            return axiosClient.post(`${prefix}/activities/${id}`, payload, {
                 headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        return axiosClient.put(`${prefix}/activities/${id}`, payload);
    },
    delete: async (id, role) => {
        const prefix = getApiPrefix(role);
        return axiosClient.delete(`${prefix}/activities/${id}`);
    },

    // If API endpoints are already role-specific (e.g., /api/admin/activities, /api/teacher/activities)
    // Then the 'role' parameter might not be needed in each function,
    // and you might have separate API files like AdminActivityApi.js, TeacherActivityApi.js
};

export default ActivityApi;