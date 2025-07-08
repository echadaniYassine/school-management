// src/components/Student/Pages/StudentAssignments.jsx

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Download, FileText } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AssignmentApi from "../../../Services/Api/Assignment";

const StudentAssignmentsLoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="mt-3 pt-3 border-t space-y-1">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default function StudentAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadError, setDownloadError] = useState(null);
    const userRole = 'student';

    const fetchAssignments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = {}; // Add pagination or filter params if needed
            const response = await AssignmentApi.getAll(userRole, params);
            setAssignments(response.data?.data || []);
        } catch (err) {
            console.error(`Failed to fetch assignments for role ${userRole}:`, err);
            setError(err.response?.data?.message || "Failed to load assignments. Please try again.");
            setAssignments([]);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);

    const handleDownloadInstructions = async (assignmentId, assignmentTitle) => {
        setDownloadError(null); // Clear previous download error
        try {
            const response = await AssignmentApi.downloadInstructions(assignmentId, userRole);
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            
            const contentDisposition = response.headers['content-disposition'];
            let filename = `${assignmentTitle || 'assignment'}-instructions.file`; // Default filename
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                if (filenameMatch && filenameMatch.length === 2)
                    filename = filenameMatch[1];
            }
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (err) {
            console.error(`Failed to download instructions for assignment ${assignmentId}:`, err);
            const message = err.response?.data?.message || "Could not download file. Please try again.";
            setDownloadError(message); // Show specific download error
            // Optionally, use a toast notification system here instead of an alert
            // alert(message); 
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <FileText className="mr-2 h-6 w-6" />
                        Your Assignments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        View your assigned tasks, due dates, and instructions.
                    </p>

                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error Loading Assignments</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {downloadError && (
                         <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Download Error</AlertTitle>
                            <AlertDescription>{downloadError}</AlertDescription>
                        </Alert>
                    )}


                    {isLoading ? (
                        <StudentAssignmentsLoadingSkeleton />
                    ) : !error && assignments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">You have no assignments at the moment.</p>
                        </div>
                    ) : !error && assignments.length > 0 ? (
                        <div className="space-y-4">
                            {assignments.map(assignment => (
                                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{assignment.title || "Untitled Assignment"}</CardTitle>
                                        {assignment.course?.title && (
                                            <p className="text-sm text-muted-foreground">Course: {assignment.course.title}</p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {assignment.description || "No detailed description."}
                                        </p>
                                        <div className="mt-3 pt-3 border-t">
                                            {assignment.due_date && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Due Date: <span className="font-medium">{new Date(assignment.due_date).toLocaleDateString()}</span>
                                                </p>
                                            )}
                                            {assignment.status && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Status: <span className="font-medium capitalize">{assignment.status}</span>
                                                </p>
                                            )}
                                            {assignment.instructions_file_path && (
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="p-0 h-auto mt-2 text-primary hover:underline"
                                                    onClick={() => handleDownloadInstructions(assignment.id, assignment.title)}
                                                >
                                                    <Download className="mr-1 h-3 w-3" /> Download Instructions
                                                </Button>
                                            )}
                                        </div>
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