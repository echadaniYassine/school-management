// src/components/admin/assignments/AdminViewAssignments.jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus, Search } from 'lucide-react'; // Added Download icon
import { useCallback, useEffect, useState } from 'react';

import AssignmentApi from '../../../Services/Api/Admin/Assignment'; // Adjust path if necessary
import AssignmentsList from '../Assignments/AssignmentsList'; // Adjusted path based on your provided structure
import UpsertAssignmentForm from '../Forms/UpsertAssignmentForm'; // You need to create this

// Constants for filters - ideally, courses might be fetched too
const COURSE_OPTIONS = ["All Courses", "Mathematics 101", "World History", "Physics 201", "English Literature", "Computer Science Basics"]; // Example
const STATUS_OPTIONS = ["All Statuses", "draft", "published", "archived", "grading", "graded"];


// Loading Skeleton for Assignments List
const AssignmentsLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <Skeleton className="h-8 w-24 mt-2 sm:mt-0" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);


export default function AdminManageAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false); // For form submissions
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0, perPage: 10 });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(COURSE_OPTIONS[0]);
    const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);

    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentAssignmentForUpsert, setCurrentAssignmentForUpsert] = useState(null);

    const fetchAssignments = useCallback(async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                page,
                per_page: pagination.perPage,
                search: searchTerm,
                course: selectedCourse === COURSE_OPTIONS[0] ? '' : selectedCourse,
                status: selectedStatus === STATUS_OPTIONS[0] ? '' : selectedStatus,
            };
            const response = await AssignmentApi.getAll(params);
            setAssignments(response.data.data || []);
            setPagination(prev => ({
                ...prev,
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
            }));
        } catch (err) {
            console.error("Failed to fetch assignments:", err);
            setError(err.response?.data?.message || "Failed to load assignments.");
            setAssignments([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, selectedCourse, selectedStatus, pagination.perPage]);

    useEffect(() => {
        fetchAssignments(1); // Fetch on initial load or when filters change
    }, [fetchAssignments]);


    const handleOpenCreateModal = () => {
        setCurrentAssignmentForUpsert(null);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (assignment) => {
        setCurrentAssignmentForUpsert(assignment);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentAssignmentForUpsert(null);
    };

    const handleSaveAssignment = async (formData) => { // Expects FormData from UpsertAssignmentForm
        setError(null);
        setIsSending(true);
        try {
            if (currentAssignmentForUpsert && currentAssignmentForUpsert.id) {
                await AssignmentApi.update(currentAssignmentForUpsert.id, formData);
                // TODO: Show success toast "Assignment updated"
            } else {
                await AssignmentApi.create(formData);
                // TODO: Show success toast "Assignment created"
            }
            handleCloseUpsertModal();
            fetchAssignments(currentAssignmentForUpsert ? pagination.currentPage : 1); // Refetch
        } catch (err) {
            console.error("Failed to save assignment:", err);
            let errorMessage = "Failed to save assignment.";
            if (err.response?.data?.errors) {
                errorMessage = Object.values(err.response.data.errors).flat().join(' ');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage); // Display error, ideally within the modal
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        // Optionally add a confirmation dialog here
        setError(null);
        try {
            await AssignmentApi.delete(assignmentId);
            // TODO: Show success toast "Assignment deleted"
            fetchAssignments(pagination.currentPage); // Refetch
        } catch (err) {
            console.error("Failed to delete assignment:", err);
            setError(err.response?.data?.message || "Failed to delete assignment.");
        }
    };

    const handleDownloadInstructions = async (assignmentId, assignmentTitle) => {
        try {
            const response = await AssignmentApi.downloadInstructions(assignmentId);
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            // Try to get filename from content-disposition header, fallback to constructing one
            const contentDisposition = response.headers['content-disposition'];
            let filename = `${assignmentTitle}-instructions.unknown`;
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                if (filenameMatch && filenameMatch.length === 2)
                    filename = filenameMatch[1];
            }
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);
        } catch (err) {
            console.error("Failed to download instructions:", err);
            setError(err.response?.data?.message || "Could not download file.");
        }
    };

    const handleViewSubmissions = (assignmentId) => {
        console.log("View submissions for assignment ID:", assignmentId);
        alert(`Implement view submissions for assignment ID: ${assignmentId}. This might navigate to a new page or open a detailed modal.`);
        // Example navigation: history.push(`/admin/assignments/${assignmentId}/submissions`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.lastPage) {
            fetchAssignments(newPage);
        }
    };


    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl font-bold">Manage Assignments</CardTitle>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        New Assignment
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Create, view, and manage all academic assignments.
                    </p>

                    {/* Filters Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by title or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by course" />
                            </SelectTrigger>
                            <SelectContent>
                                {COURSE_OPTIONS.map(course => (
                                    <SelectItem key={course} value={course}>{course}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {error && !isUpsertModalOpen && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading ? (
                        <AssignmentsLoadingSkeleton />
                    ) : assignments.length === 0 && !error ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                {searchTerm || selectedCourse !== COURSE_OPTIONS[0] || selectedStatus !== STATUS_OPTIONS[0]
                                    ? "No assignments match your filters."
                                    : "No assignments found. Create one to get started."}
                            </p>
                        </div>
                    ) : !error ? (
                        <AssignmentsList
                            assignments={assignments}
                            onViewSubmissions={handleViewSubmissions}
                            onEditAssignment={handleOpenEditModal} // Pass edit handler
                            onDeleteAssignment={handleDeleteAssignment} // Pass delete handler
                            onDownloadInstructions={handleDownloadInstructions} // Pass download handler
                        />
                    ) : null}

                    {/* Pagination Controls */}
                    {!isLoading && !error && assignments.length > 0 && pagination.lastPage > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                variant="outline"
                            >
                                Previous
                            </Button>
                            <span>
                                Page {pagination.currentPage} of {pagination.lastPage} (Total: {pagination.total})
                            </span>
                            <Button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.lastPage}
                                variant="outline"
                            >
                                Next
                            </Button>
                        </div>
                    )}

                </CardContent>
            </Card>

            {isUpsertModalOpen && (
                <UpsertAssignmentForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) handleCloseUpsertModal(); // Your function to set isUpsertModalOpen(false) and reset currentAssignment
                        else setIsUpsertModalOpen(true);
                    }}
                    onSubmit={handleSaveAssignment} // Your function that calls AssignmentApi.create/update with FormData
                    initialData={currentAssignmentForUpsert}
                    dialogTitle={currentAssignmentForUpsert ? "Edit Assignment" : "Create New Assignment"}
                    dialogDescription={
                        currentAssignmentForUpsert
                            ? "Make changes to the assignment details."
                            : "Fill in the details to create a new assignment."
                    }
                    submitButtonText={currentAssignmentForUpsert ? "Update Assignment" : "Create Assignment"}
                    isSending={isSending} // Your state variable for API call in progress
                    formError={error} // Your state variable for API errors (to show in the modal)
                />
            )}
        </div>
    );
}