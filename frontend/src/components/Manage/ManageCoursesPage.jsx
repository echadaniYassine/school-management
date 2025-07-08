// src/components/shared/ManageCoursesPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Search } from 'lucide-react';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Custom Components
import CoursesApi from '../../Services/Api/Courses'; // Adjust path
import CoursesList from '../Admin/Courses/CoursesList'; // Adjust path
import UpsertCourseForm from '../Admin/Forms/UpsertCourseForm'; // Adjust path

// Loading Skeleton Component
const CoursesLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="space-y-2 flex-1"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div>
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

    const fetchCourses = useCallback(async (page = 1, search = '') => {
        setIsLoading(true);
        try {
            const response = await CoursesApi.getAll({
                role: userRole,
                params: { page, search }
            });
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
    }, [userRole]); // Depends only on userRole

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

    const handleSaveCourse = async (formData) => {
        setIsSubmitting(true);
        try {
            if (currentCourse?.id) {
                await CoursesApi.update({ role: userRole, id: currentCourse.id, formData });
                toast.success("Course updated successfully!");
            } else {
                await CoursesApi.create({ role: userRole, formData });
                toast.success("Course created successfully!");
            }
            setIsModalOpen(false);
            fetchCourses(pagination.currentPage, searchTerm); // Refetch data
        } catch (error) {
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : "Failed to save course.";
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
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

    const handleManageContent = (course) => {
        toast.info(`Implement navigation to content manager for "${course.title}".`);
    };

    // Use the prop to dynamically set the page title
    const pageTitle = userRole === 'admin' ? 'Manage All Courses' : 'My Courses';

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">{pageTitle}</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
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
                    onManageCourseContent={handleManageContent}
                />
            )}
            
            {/* You can add pagination controls here if needed */}

            {isModalOpen && (
                <UpsertCourseForm
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onSubmit={handleSaveCourse}
                    initialData={currentCourse}
                    isSending={isSubmitting}
                />
            )}
        </div>
    );
}