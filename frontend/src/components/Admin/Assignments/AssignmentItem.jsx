// src/components/admin/assignments/AssignmentItem.jsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarDays, Download, Edit2, FileText, Trash2, Users } from 'lucide-react';

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        archived: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
        grading: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
        graded: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
    };
    return statusStyles[status?.toLowerCase()] || "bg-indigo-100 text-indigo-800 border-indigo-200";
};

export default function AssignmentItem({ assignment, onViewSubmissions, onEdit, onDelete, onDownload }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                    <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                            <Badge className={getStatusBadgeClass(assignment.status)}>
                                {assignment.status?.charAt(0).toUpperCase() + assignment.status?.slice(1) || 'N/A'}
                            </Badge>
                        </div>
                        {assignment.course && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                <BookOpen className="h-4 w-4" />
                                {assignment.course}
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-start">
                        {onViewSubmissions && (
                             <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onViewSubmissions(assignment.id)}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Submissions
                            </Button>
                        )}
                         {assignment.hasInstructionsFile && onDownload && (
                            <Button variant="outline" size="sm" onClick={() => onDownload(assignment.id, assignment.title)}>
                                <Download className="h-4 w-4 mr-2" />
                                Instructions
                            </Button>
                        )}
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                     <p className="text-sm text-muted-foreground mb-2">
                        <Users className="h-4 w-4 inline mr-1" />
                        Assigned to: {assignment.assignedTo || 'N/A'}
                    </p>
                    {(typeof assignment.submissionsReceived === 'number' || typeof assignment.totalStudents === 'number') && (
                        <p className="text-sm text-muted-foreground mb-3">
                            Submissions Progress: {assignment.submissionsReceived ?? 'N/A'} / {assignment.totalStudents ?? 'N/A'}
                        </p>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(assignment)}
                        >
                            <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the assignment
                                        "{assignment.title}".
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelete(assignment.id)} className="bg-red-600 hover:bg-red-700">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}