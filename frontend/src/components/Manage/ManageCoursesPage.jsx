// src/components/shared/ManageCoursesPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Search } from 'lucide-react';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Custom Components
import CoursesApi from '../../Services/Api/Courses'; // Adjust path - Assuming corrected path from your structure
import CoursesList from '../admin/courses/CoursesList'; // Adjust path
import UpsertCourseForm from '../admin/Forms/UpsertCourseForm'; // Adjust path
import CourseDetailView from '../admin/courses/CourseDetailView';

// Loading Skeleton Component
const CoursesLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
                <Skeleton className="h-[180px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                </div>
            </div>
        ))}
    </div>
);

/**
 * A reusable component to manage courses for different user roles.
 * @param {{ userRole: 'admin' | 'teacher' }} props - The role of the user viewing the page.
 */
export default function ManageCoursesPage({ userRole }) {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1 });
    // --- Add new state for the detail view modal ---
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const fetchCourses = useCallback(async (page = 1, search = '') => {
        setIsLoading(true);
        try {
            // Note: Your CoursesApi.getAll() sends params nested under a 'params' key.
            const response = await CoursesApi.getAll({ role: userRole, params: { page, search } });
            setCourses(response.data.data || []);
            if (response.data.meta) {
                setPagination({
                    currentPage: response.data.meta.current_page,
                    lastPage: response.data.meta.last_page,
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load courses.");
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchCourses(1, searchTerm);
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, fetchCourses]);

    const handleOpenCreateModal = () => {
        setCurrentCourse(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (course) => {
        setCurrentCourse(course);
        setIsModalOpen(true);
    };

    // --- Add handler for opening the view modal ---
    const handleViewCourse = (course) => {
        setCurrentCourse(course); // Set the course to be viewed
        setIsViewModalOpen(true);
    };

    const handleSaveCourse = async (formData) => {
        setIsSubmitting(true);
        try {
            if (currentCourse?.id) {
                // FIX: Pass the form data under the 'payload' key as expected by the API service.
                await CoursesApi.update({ role: userRole, id: currentCourse.id, payload: formData });
                toast.success("Course updated successfully!");
            } else {
                // FIX: Pass the form data under the 'payload' key as expected by the API service.
                await CoursesApi.create({ role: userRole, payload: formData });
                toast.success("Course created successfully!");
            }
            setIsModalOpen(false);
            fetchCourses(pagination.currentPage, searchTerm); // Refetch data
        } catch (error) {
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : (error.response?.data?.message || "Failed to save course.");
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        // The AlertDialog in CourseItem handles the confirmation, so window.confirm is redundant.
        try {
            await CoursesApi.delete({ role: userRole, id: courseId });
            toast.success("Course deleted successfully!");
            // Refetch, potentially adjusting the page if it becomes empty
            const newPage = courses.length === 1 && pagination.currentPage > 1
                ? pagination.currentPage - 1
                : pagination.currentPage;
            fetchCourses(newPage, searchTerm);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete course.");
        }
    };


    const pageTitle = userRole === 'admin' ? 'Manage All Courses' : 'My Courses';
    const dialogTitle = currentCourse ? "Edit Course" : "Create New Course";
    const dialogDescription = currentCourse ? "Update the details of the existing course." : "Fill in the details to add a new course.";
    const submitButtonText = isSubmitting ? (currentCourse ? "Saving..." : "Creating...") : (currentCourse ? "Save Changes" : "Create Course");

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">Browse, create, and manage your courses.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0 md:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button className="flex-shrink-0" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Course
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <CoursesLoadingSkeleton />
            ) : (
                <CoursesList
                    courses={courses}
                    onEditCourse={handleOpenEditModal}
                    onDeleteCourse={handleDeleteCourse}
                    onViewCourse={handleViewCourse}

                />
            )}

            {/* You can add pagination controls here if needed, using the 'pagination' state */}

            {isModalOpen && (
                <UpsertCourseForm
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onSubmit={handleSaveCourse}
                    initialData={currentCourse}
                    dialogTitle={dialogTitle}
                    dialogDescription={dialogDescription}
                    submitButtonText={submitButtonText}
                />
            )}

              {/* --- Render the new Detail View modal --- */}
            {/* It will only show up when a course is selected and isViewModalOpen is true */}
            <CourseDetailView
                course={currentCourse}
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />
        </div>
    );
}