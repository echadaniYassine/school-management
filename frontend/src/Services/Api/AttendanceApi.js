// src/Services/Api/AttendanceApi.js

import { axiosClient } from "../../Api/axios";

/**
 * API service for fetching attendance-related data.
 */
const AttendanceApi = {
    /**
     * Fetches daily attendance counts over a given time range.
     * @param {{ timeRange: '90d' | '30d' | '7d' }} options
     */
    getOverTime: ({ timeRange }) => {
        return axiosClient.get('/attendance-over-time', {
            params: {
                range: timeRange,
            },
        });
    },
};

export default AttendanceApi;