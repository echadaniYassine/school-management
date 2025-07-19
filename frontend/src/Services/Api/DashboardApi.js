// src/Services/Api/DashboardApi.js

import { axiosClient } from "../../Api/axios";

/**
 * API service for fetching aggregated dashboard data.
 */
const DashboardApi = {
    /**
     * Fetches all key dashboard statistics from a single, optimized backend endpoint.
     * @param {{ role: 'admin' | 'teacher' | 'student' }} options - The user role to determine the correct endpoint.
     * @returns {Promise<object>} A promise that resolves to the dashboard statistics object.
     */
    getStats: ({ role }) => {
        // The API endpoint can be customized based on role if necessary.
        // For an admin dashboard, a hardcoded path is robust.
        if (role !== 'admin') {
            // Or handle other roles if they have their own stats endpoint
            return Promise.reject(new Error("Statistics are only available for admins."));
        }
        
        // This is the single, efficient network request.
        return axiosClient.get('/dashboard-stats');
    },
};

export default DashboardApi;