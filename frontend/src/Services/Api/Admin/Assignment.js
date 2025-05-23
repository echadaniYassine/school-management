// src/Api/AssignmentApi.js
import { axiosClient } from "../../../Api/axios"; // Your configured axios instance

const AssignmentApi = {
    getAll: async (params = {}) => { // params: { page, search, course, status, per_page }
        return await axiosClient.get('/admin/assignments', { params });
    },
    getById: async (id) => {
        return await axiosClient.get(`/admin/assignments/${id}`);
    },
    create: async (formData) => { // Expects FormData if file uploads are involved
        return await axiosClient.post('/admin/assignments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    },
    update: async (id, formData) => { // Expects FormData
        // FormData with PUT is tricky, so backend often expects POST with _method field
        formData.append('_method', 'PUT');
        return await axiosClient.post(`/admin/assignments/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/assignments/${id}`);
    },
    downloadInstructions: async (id) => {
        // This will trigger a file download
        return await axiosClient.get(`/admin/assignments/${id}/download-instructions`, {
            responseType: 'blob', // Important for file downloads
        });
    }
};
export default AssignmentApi;