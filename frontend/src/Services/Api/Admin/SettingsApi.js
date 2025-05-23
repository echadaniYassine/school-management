// src/Api/SettingsApi.js
import { axiosClient } from "../../../Api//axios"; // Your configured axios instance

const SettingsApi = {
    getAll: async () => {
        return await axiosClient.get('/admin/system-settings');
    },
    updateSection: async (sectionKey, sectionData) => {
        // Backend might expect specific handling for booleans (e.g., 0/1 or "true"/"false")
        // For now, assume backend handles JS true/false directly or via casting.
        return await axiosClient.put(`/admin/system-settings/${sectionKey}`, sectionData);
    },
    clearCache: async () => {
        return await axiosClient.post('/admin/system-actions/clear-cache');
    }
    // Add other system action API calls here
};

export default SettingsApi;