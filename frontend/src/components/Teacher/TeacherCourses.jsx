// src/components/admin/courses/AdminManageCourses.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import CoursesApi from '../../Services/Api/Admin/Courses.js'; // Adjust path as needed
import CoursesList from '../Admin/Courses/CoursesList'; // Adjust path as needed
import UpsertCourseForm from '../Admin/Forms/UpsertCourseForm'; // Adjust path as needed

// This component could be named 'ManageCoursesPage' or similar if it's generic.
// If this specific file/component instance is ALWAYS for teachers, then 'TeacherCourses' is fine.
export default function TeacherCourses() { // Or AdminManageCourses, or ManageCourses
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentCourseForUpsert, setCurrentCourseForUpsert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Determine the user's role.
    // This should ideally come from your authentication context/state.
    // For this example, if this component is 'TeacherCourses', we set it to 'teacher'.
    // If this component were used by an admin, this would be 'admin'.
    // If this component is generic, userRole would be dynamic (e.g., from props or context).
    const userRole = 'teacher'; // <--- CRITICAL: Set this based on the context.
                                // If this component is specifically for teachers, 'teacher' is correct.
                                // If an admin uses a similar component, it would be 'admin'.

    const loadCourses = useCallback(async (search = searchTerm) => {
        setIsLoading(true);
        try {
            const params = {};
            if (search) {
                params.search = search;
            }
            // Pass the determined userRole
            const response = await CoursesApi.getAll(params, userRole);
            setAllCourses(response.data.data || response.data);
            setFilteredCourses(response.data.data || response.data);
        } catch (error) {
            console.error(`Failed to fetch courses for role ${userRole}:`, error);
            toast.error(error.response?.data?.message || "Failed to load courses.");
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, userRole]); // Add userRole to dependency array

    useEffect(() => {
        if (userRole) { // Only load if userRole is determined
            loadCourses();
        }
    }, [loadCourses, userRole]); // Add userRole to dependency array

    // Client-side search (remains the same)
    useEffect(() => {
        if (!searchTerm) {
            setFilteredCourses(allCourses);
            return;
        }
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = allCourses.filter(course =>
            course.title.toLowerCase().includes(lowerSearchTerm) ||
            (course.code && course.code.toLowerCase().includes(lowerSearchTerm)) ||
            (course.instructor && course.instructor.toLowerCase().includes(lowerSearchTerm)) ||
            (course.category && course.category.toLowerCase().includes(lowerSearchTerm))
        );
        setFilteredCourses(filtered);
    }, [searchTerm, allCourses]);


    const handleOpenCreateModal = () => {
        setCurrentCourseForUpsert(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (course) => {
        setCurrentCourseForUpsert({ ...course, price: course.price?.toString() });
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentCourseForUpsert(null);
    };

    const handleSaveCourse = async (courseDataFromForm) => {
        setIsSubmitting(true);
        const payload = {
            ...courseDataFromForm,
            price: parseFloat(courseDataFromForm.price) || 0,
        };

        try {
            if (currentCourseForUpsert && currentCourseForUpsert.id) {
                // Pass userRole here
                const response = await CoursesApi.update(currentCourseForUpsert.id, payload, userRole);
                const updatedCourse = response.data.data;
                setAllCourses(prevCourses =>
                    prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
                );
                toast.success(`Course "${updatedCourse.title}" updated successfully!`);
            } else {
                // Pass userRole here
                const response = await CoursesApi.create(payload, userRole);
                const newCourse = response.data.data;
                setAllCourses(prevCourses => [newCourse, ...prevCourses]);
                toast.success(`Course "${newCourse.title}" created successfully!`);
            }
            handleCloseUpsertModal();
        } catch (error) {
            console.error(`Failed to save course for role ${userRole}:`, error.response);
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : (error.response?.data?.message || "Failed to save course. Please check your input.");
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            // Pass userRole here
            await CoursesApi.delete(courseId, userRole);
            setAllCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            toast.success("Course deleted successfully!");
        } catch (error) {
            console.error(`Failed to delete course for role ${userRole}:`, error);
            toast.error(error.response?.data?.message || "Failed to delete course.");
        }
    };

    const handleManageCourseContent = (course) => {
        console.log("Manage content for course:", course.title, course.id);
        toast.info(`Implement 'Manage Content' for: ${course.title}`);
    };

    // If userRole is not yet determined (e.g., if fetched asynchronously from auth context),
    // you might want to show a loading state or return null.
    if (!userRole) {
        return <div>Loading user data...</div>; // Or some other placeholder
    }

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Manage Courses ({userRole === 'teacher' ? 'Teacher View' : 'Admin View'})</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Search courses (client-side)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow md:w-64"
                    />
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        New Course
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-md" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CoursesList
                    courses={filteredCourses}
                    onEditCourse={handleOpenEditModal}
                    onDeleteCourse={handleDeleteCourse}
                    onManageCourseContent={handleManageCourseContent}
                />
            )}


            {isUpsertModalOpen && (
                <UpsertCourseForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={setIsUpsertModalOpen} // This should just pass the new state, not setIsUpsertModalOpen directly if it's a callback
                    onSubmit={handleSaveCourse}
                    initialData={currentCourseForUpsert}
                    dialogTitle={currentCourseForUpsert ? "Edit Course Details" : "Create New Course"}
                    dialogDescription={
                        currentCourseForUpsert
                            ? "Update the details for this course."
                            : "Add a new course to your platform."
                    }
                    submitButtonText={isSubmitting ? (currentCourseForUpsert ? "Saving..." : "Creating...") : (currentCourseForUpsert ? "Save Changes" : "Create Course")}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}