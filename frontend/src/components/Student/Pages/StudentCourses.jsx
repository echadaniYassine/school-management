import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, AlertCircle } from 'lucide-react';
import CoursesApi from "../../../Services/Api/Admin/Courses";

const StudentCoursesLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
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
  const userRole = 'student';

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CoursesApi.getAll({}, userRole);
      setCourses(response.data?.data || []);
    } catch (err) {
      console.error(`Failed to fetch courses for role ${userRole}:`, err);
      let errorMessage = "Failed to load courses. Please try again.";
      if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
      } else if (err.message) {
          // Handle cases like "target must be an object" if they originate here
          errorMessage = `Client-side error: ${err.message}`;
      }
      setError(errorMessage);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Available Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Here are the courses available for you to view and participate in.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <StudentCoursesLoadingSkeleton />
          ) : !error && courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses are currently available.</p>
            </div>
          ) : !error && courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map(course => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title || "Untitled Course"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description || "No description available."}
                    </p>
                    {course.category?.name && (
                      <p className="text-xs text-gray-500 mt-2">Category: {course.category.name}</p>
                    )}
                    {course.created_at && (
                      <p className="text-xs text-gray-500 mt-1">Created on: {new Date(course.created_at).toLocaleDateString()}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}