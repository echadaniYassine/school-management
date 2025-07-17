// src/components/student/Pages/StudentCourses.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, AlertCircle } from 'lucide-react';
import CoursesApi from "../../../Services/Api/Courses"; // Make sure path is correct
import CourseDetailView from '../views/CourseDetailView'; // <-- Import the new view

// A dedicated component for the loading state.
const StudentCoursesLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={`skeleton-${i}`}> {/* Added a key for best practices */}
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);


  // The role is hard-coded because this is a student-specific page.
  const userRole = 'student';

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // --- THE FIX ---
      // We now call the API with a single object containing the 'role' and optional 'params'.
      const response = await CoursesApi.getAll({ role: userRole });

      // Ensure we have an array, even if the API response is unexpected.
      setCourses(Array.isArray(response.data?.data) ? response.data.data : []);

    } catch (err) {
      console.error(`Failed to fetch courses for role ${userRole}:`, err);
      // Provide a more user-friendly default error message.
      const errorMessage = err.response?.data?.message || "An unexpected error occurred while loading courses.";
      setError(errorMessage);
      setCourses([]); // Clear any previous course data on error
    } finally {
      setIsLoading(false);
    }
  }, [userRole]); // The dependency array is correct.

  useEffect(() => {
    // This effect runs once on component mount to fetch the initial data.
    fetchCourses();
  }, [fetchCourses]);

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsViewOpen(true);
  };


  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            My Enrolled Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Here are the courses you are currently enrolled in.
          </p>

          {/* Conditional Rendering Logic */}
          {isLoading ? (
            <StudentCoursesLoadingSkeleton />
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Courses</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-lg font-medium text-muted-foreground">You are not enrolled in any courses yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Please contact an administrator if you believe this is an error.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map(course => (
                <Card key={course.id} onClick={() => handleViewCourse(course)} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title || "Untitled Course"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {course.description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>Category: <strong>{course.category?.name || 'N/A'}</strong></span>
                      <span>Created: <strong>{new Date(course.created_at).toLocaleDateString()}</strong></span>
                    </div>
                  </CardContent>
                </Card>

              ))}
              <CourseDetailView course={selectedCourse} isOpen={isViewOpen} onOpenChange={setIsViewOpen} />

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}