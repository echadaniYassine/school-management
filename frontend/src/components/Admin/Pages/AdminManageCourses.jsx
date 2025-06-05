// src/components/admin/courses/AdminManageCourses.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner'; // Make sure you have sonner or a similar toast library installed

// Adjust import paths for your project structure
import CoursesApi from '../../../Services/Api/Admin/Courses.js'; // Adjust path to your CoursesApi.js
import CoursesList from '../Courses/CoursesList'; // Or './CoursesList' if in same folder
import UpsertCourseForm from '../Forms/UpsertCourseForm'; // Or './UpsertCourseForm'

export default function AdminManageCourses() {
    const [allCourses, setAllCourses] = useState([]); // Will be fetched from API
    // filteredCourses might not be needed if backend handles all filtering/searching
    // For client-side filtering after initial load, it can be useful.
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentCourseForUpsert, setCurrentCourseForUpsert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state (optional, if your API supports it)
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    const loadCourses = useCallback(async (search = searchTerm /*, page = currentPage*/) => {
        setIsLoading(true);
        try {
            const params = {};
            if (search) {
                params.search = search;
            }
            // params.page = page; // For pagination

            const response = await CoursesApi.getAll(params);
            // Laravel pagination nests data under 'data' key. API resource collection also does.
            setAllCourses(response.data.data || response.data);
            setFilteredCourses(response.data.data || response.data); // Initialize filtered list

            // if (response.data.meta) { // For Laravel paginated response
            //     setCurrentPage(response.data.meta.current_page);
            //     setTotalPages(response.data.meta.last_page);
            // }
            // toast.success("Courses loaded!"); // Maybe too noisy for every load
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            toast.error(error.response?.data?.message || "Failed to load courses.");
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm /*, currentPage */]); // Add dependencies if using them

    useEffect(() => {
        loadCourses();
    }, [loadCourses]); // Initial load and when loadCourses dependencies change

    // Client-side search after initial load (if not relying solely on backend search)
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
        // Data from backend (CourseResource) should already be in camelCase for thumbnailUrl
        setCurrentCourseForUpsert({ ...course, price: course.price?.toString() }); // Ensure price is string for form input
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentCourseForUpsert(null);
    };

    const handleSaveCourse = async (courseDataFromForm) => {
        setIsSubmitting(true);
        // The CoursesApi methods now handle the snake_case conversion for thumbnailUrl
        // Ensure price is parsed to float if it's a string from the form
        const payload = {
            ...courseDataFromForm,
            price: parseFloat(courseDataFromForm.price) || 0,
        };

        try {
            if (currentCourseForUpsert && currentCourseForUpsert.id) {
                const response = await CoursesApi.update(currentCourseForUpsert.id, payload);
                // Update the list with the course from the API response (which is the updated one)
                const updatedCourse = response.data.data; // Assuming API returns { data: course }
                setAllCourses(prevCourses =>
                    prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
                );
                toast.success(`Course "${updatedCourse.title}" updated successfully!`);
            } else {
                const response = await CoursesApi.create(payload);
                const newCourse = response.data.data; // Assuming API returns { data: course }
                setAllCourses(prevCourses => [newCourse, ...prevCourses]); // Add to top
                toast.success(`Course "${newCourse.title}" created successfully!`);
            }
            handleCloseUpsertModal();
        } catch (error) {
            console.error("Failed to save course:", error.response);
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : (error.response?.data?.message || "Failed to save course. Please check your input.");
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        // Add a confirmation dialog (e.g., using shadcn AlertDialog or window.confirm)
        // For now, proceeding directly:
        try {
            await CoursesApi.delete(courseId);
            setAllCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            // setFilteredCourses will update automatically due to its dependency on allCourses
            toast.success("Course deleted successfully!");
        } catch (error) {
            console.error("Failed to delete course:", error);
            toast.error(error.response?.data?.message || "Failed to delete course.");
        }
    };

    const handleManageCourseContent = (course) => {
        console.log("Manage content for course:", course.title, course.id);
        toast.info(`Implement 'Manage Content' for: ${course.title}`);
        // Example navigation: history.push(`/admin/courses/${course.id}/content`);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Manage Courses</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Search courses (client-side)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow md:w-64"
                    />
                    {/* If using backend search, you might have a search button or debounce in loadCourses */}
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
                    onOpenChange={setIsUpsertModalOpen}
                    onSubmit={handleSaveCourse}
                    initialData={currentCourseForUpsert}
                    dialogTitle={currentCourseForUpsert ? "Edit Course Details" : "Create New Course"}
                    dialogDescription={
                        currentCourseForUpsert
                            ? "Update the details for this course."
                            : "Add a new course to your platform."
                    }
                    submitButtonText={isSubmitting ? (currentCourseForUpsert ? "Saving..." : "Creating...") : (currentCourseForUpsert ? "Save Changes" : "Create Course")}
                    isSubmitting={isSubmitting} // Pass submitting state to form
                />
            )}
        </div>
    );
}