// src/Api/NotificationApi.js
import { axiosClient } from "../../../Api/axios"; // Assuming axios.js is in the same Api folder

const NotificationApi = {
    /**
     * Fetches all notifications.
     * Backend might paginate, so response.data could be { data: [...], links: {}, meta: {} }
     */
    all: async () => {
        return await axiosClient.get('/admin/notifications');
    },

    /**
     * Sends/creates a new notification.
     * @param {object} payload - The notification data.
     * Expected payload shape by frontend: { title, message, targetType, targetValue }
     */
    send: async (payload) => {
        // Map frontend field names to backend field names if they differ
        const backendPayload = {
            title: payload.title,
            message: payload.message,
            target_type: payload.targetType, // Ensure SendNotificationForm uses 'targetType'
            target_value: payload.targetValue, // Ensure SendNotificationForm uses 'targetValue'
        };
        return await axiosClient.post('/admin/notifications', backendPayload);
    },

    // Future methods (optional)
    get: async (id) => {
        return await axiosClient.get(`/admin/notifications/${id}`);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/notifications/${id}`, payload);
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/notifications/${id}`);
    },
};

export default NotificationApi;