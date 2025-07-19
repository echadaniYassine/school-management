// src/hooks/useAttendanceChart.js

"use client";

import { useState, useEffect } from 'react';
import AttendanceApi from '@/Services/Api/AttendanceApi'; // Adjust path

export function useAttendanceChart({ timeRange }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A flag to prevent state updates if the component unmounts during the API call
    let isMounted = true; 

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await AttendanceApi.getOverTime({ timeRange });

        if (isMounted) {
          // The API returns { date, count }. We map it to the format the chart expects.
          const formattedData = response.data.map(item => ({
            date: item.date,
            students: item.count, // Rename 'count' to 'students' for clarity
          }));
          setChartData(formattedData);
        }
      } catch (err) {
        console.error("Failed to fetch attendance data:", err);
        if (isMounted) {
          setError("Could not load attendance data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [timeRange]); // Re-fetch whenever the timeRange changes

  return { chartData, loading, error };
}