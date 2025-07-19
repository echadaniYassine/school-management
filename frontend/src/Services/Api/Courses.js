// src/Services/Api/Courses.js

import { axiosClient } from "../../Api/axios";

// Helper function to determine the API endpoint prefix based on role
const getPrefix = (role) => {
    if (role === 'admin') return '/admin'; // Returns /admin
    if (role === 'teacher') return '/teacher'; // Returns /teacher
    return '';
};

const CourseApi = {
    // Fetches all courses. The endpoint depends on the role.
    getAll: ({ role, params = {} }) => {
        const prefix = getPrefix(role);
        return axiosClient.get(`${prefix}/courses`, { params });
    },

    // --- FIX: This function now requires the role ---
    // Creates a course. Endpoint depends on the role.
    create: ({ role, payload }) => {
        const prefix = getPrefix(role);
        return axiosClient.post(`${prefix}/courses`, payload);
    },

    // --- FIX: This function now requires the role ---
    // Updates a course. Endpoint depends on the role.
    update: ({ role, id, payload }) => {
        const prefix = getPrefix(role);
        return axiosClient.put(`${prefix}/courses/${id}`, payload);
    },

    // --- FIX: This function now requires the role ---
    // Deletes a course. Endpoint depends on the role.
    delete: ({ role, id }) => {
        const prefix = getPrefix(role);
        return axiosClient.delete(`${prefix}/courses/${id}`);
    },
};

export default CourseApi;