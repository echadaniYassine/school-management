// src/hooks/useDashboardMetrics.js

import { useState, useEffect } from 'react';
import DashboardApi from '@/Services/Api/DashboardApi';
import { useUserContext } from '@/context/UserContext';
import {
  Users, BookUser, GraduationCap, Rss, Library, Drama, ClipboardCheck, School
} from "lucide-react";

/**
 * A custom hook to fetch and manage dashboard metrics.
 * It handles loading and error states automatically.
 * @returns {{ metrics: Array, loading: boolean, error: string|null }}
 */
export function useDashboardMetrics() {
  const { user } = useUserContext();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only proceed if we have a valid user role.
    if (!user?.role) {
        setLoading(false);
        return;
    };

    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        // This single call now efficiently gets the data from the new endpoint.
        const response = await DashboardApi.getStats({ role: user.role });
        
        // The actual stats are in response.data
        const stats = response.data;

        // Map the raw stats from the API to a more usable format for the UI
        const formattedMetrics = [
          { title: "Total Students", value: stats.totalStudents, Icon: GraduationCap },
          { title: "Total Teachers", value: stats.totalTeachers, Icon: BookUser },
          { title: "Total Admins", value: stats.totalAdmins, Icon: Users },
          { title: "Total Classes", value: stats.totalClasses, Icon: School },
          { title: "Total Courses", value: stats.totalCourses, Icon: Library },
          { title: "Total Blogs", value: stats.totalBlogs, Icon: Rss },
          { title: "Total Activities", value: stats.totalActivities, Icon: Drama },
          { title: "Total Assignments", value: stats.totalAssignments, Icon: ClipboardCheck },
        ];
        
        setMetrics(formattedMetrics);
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
        setError("Could not load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.role]); // Re-run the effect if the user's role ever changes

  return { metrics, loading, error };
}