// src/components/shared/ManageAssignmentsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Search, AlertCircle } from 'lucide-react';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import AssignmentApi from '../../Services/Api/Assignment';
import AssignmentsList from '../Admin/Assignments/AssignmentsList';
import UpsertAssignmentForm from '../Admin/Forms/UpsertAssignmentForm';
import AssignmentDetailView from '../admin/assignments/AssignmentDetailView';

// Constants and Skeleton (You can keep these as they are)
const COURSE_OPTIONS = ["All Courses", "Mathematics 101", "World History", "Physics 201", "English Literature", "Computer Science Basics"];
const STATUS_OPTIONS = ["All Statuses", "draft", "published", "archived", "grading", "graded"];
const AssignmentsLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i}><CardContent className="p-6"><div className="flex justify-between items-start mb-2"><div className="space-y-2"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2" /></div><Skeleton className="h-8 w-24" /></div></CardContent></Card>
        ))}
    </div>
);

/**
 * A reusable component to manage assignments for different user roles.
 * @param {{ userRole: 'admin' | 'teacher' }} props
 */
export default function ManageAssignmentsPage({ userRole }) {
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0, perPage: 10 });
    const [filters, setFilters] = useState({ searchTerm: '', course: COURSE_OPTIONS[0], status: STATUS_OPTIONS[0] });
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const fetchAssignments = useCallback(async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await AssignmentApi.getAll({
                role: userRole,
                params: {
                    page,
                    per_page: pagination.perPage,
                    search: filters.searchTerm,
                    course: filters.course === COURSE_OPTIONS[0] ? undefined : filters.course,
                    status: filters.status === STATUS_OPTIONS[0] ? undefined : filters.status,
                }
            });
            setAssignments(response.data.data || []);
            if (response.data.meta) setPagination(prev => ({ ...prev, ...response.data.meta }));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load assignments.");
        } finally {
            setIsLoading(false);
        }
    }, [userRole, filters, pagination.perPage]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => { fetchAssignments(1); }, 300);
        return () => clearTimeout(debounceTimer);
    }, [fetchAssignments]);

    const handleSaveAssignment = async (formData) => {
        setIsSending(true);
        try {
            const action = currentAssignment?.id
                ? AssignmentApi.update({ role: userRole, id: currentAssignment.id, formData })
                : AssignmentApi.create({ role: userRole, formData });

            await action;
            toast.success(`Assignment ${currentAssignment?.id ? 'updated' : 'created'} successfully!`);

            setIsUpsertModalOpen(false);
            fetchAssignments(currentAssignment ? pagination.currentPage : 1);
        } catch (error) {
            const errorMessages = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : "Failed to save assignment.";
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;
        try {
            await AssignmentApi.delete({ role: userRole, id: assignmentId });
            toast.success("Assignment deleted successfully.");
            const newPage = assignments.length === 1 && pagination.currentPage > 1 ? pagination.currentPage - 1 : pagination.currentPage;
            fetchAssignments(newPage);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete assignment.");
        }
    };
    const handleViewAssignment = (assignment) => {
        setCurrentAssignment(assignment); // Set the assignment to be viewed
        setIsViewModalOpen(true);
    };

    const pageTitle = userRole === 'admin' ? 'Manage All Assignments' : 'My Assignments';

    return (
        <div className="h-full px-4 py-6 lg:px-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <CardTitle className="text-2xl font-bold">{pageTitle}</CardTitle>
                    <Button className="flex items-center gap-2 w-full md:w-auto" onClick={() => { setCurrentAssignment(null); setIsUpsertModalOpen(true); }}>
                        <Plus className="h-4 w-4" />
                        New Assignment
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Search..." value={filters.searchTerm} onChange={(e) => setFilters(p => ({ ...p, searchTerm: e.target.value }))} className="pl-8" />
                        </div>
                        <Select value={filters.course} onValueChange={(value) => setFilters(p => ({ ...p, course: value }))}>
                            <SelectTrigger><SelectValue placeholder="Filter by course" /></SelectTrigger>
                            <SelectContent>{COURSE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filters.status} onValueChange={(value) => setFilters(p => ({ ...p, status: value }))}>
                            <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
                            <SelectContent>{STATUS_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>

                    {isLoading ? <AssignmentsLoadingSkeleton />
                        : error ? <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
                            : assignments.length === 0 ? <div className="text-center py-12 border-2 border-dashed rounded-lg"><p className="text-xl text-muted-foreground">No assignments match your criteria.</p></div>
                                : <AssignmentsList
                                    assignments={assignments}
                                    onEditAssignment={(a) => { setCurrentAssignment(a); setIsUpsertModalOpen(true); }}
                                    onDeleteAssignment={handleDeleteAssignment}
                                    onDownloadInstructions={() => toast.info("Download not implemented yet.")}
                                    onViewSubmissions={() => toast.info("View submissions not implemented yet.")}
                                    onViewAssignment={handleViewAssignment}

                                />
                    }
                </CardContent>
            </Card>

            {!isLoading && !error && pagination.lastPage > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <Button onClick={() => fetchAssignments(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} variant="outline">Previous</Button>
                    <span>Page {pagination.currentPage} of {pagination.lastPage}</span>
                    <Button onClick={() => fetchAssignments(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} variant="outline">Next</Button>
                </div>
            )}

            {isUpsertModalOpen && (
                <UpsertAssignmentForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={setIsUpsertModalOpen}
                    onSubmit={handleSaveAssignment}
                    initialData={currentAssignment}
                    isSending={isSending}

                />
            )}

             <AssignmentDetailView
                assignment={currentAssignment}
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />
        </div>
    );
}