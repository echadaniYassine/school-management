// src/components/admin/assignments/AssignmentDetailView.jsx

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CalendarDays, FileText, Users } from 'lucide-react';

export default function AssignmentDetailView({ assignment, isOpen, onOpenChange }) {
    if (!assignment) return null;

    // Helper for a more readable date format
    const formattedDueDate = assignment.due_date 
        ? new Date(assignment.due_date + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          }) 
        : 'Not set';

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{assignment.title}</DialogTitle>
                    <DialogDescription>
                        Details for this assignment. Status: 
                        <Badge variant="outline" className="ml-2">{assignment.status || 'N/A'}</Badge>
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Description Section */}
                    <div className="prose dark:prose-invert max-w-none">
                        <h4>Instructions & Description</h4>
                        <p>{assignment.description || 'No detailed instructions were provided.'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 pt-4 border-t">
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Course</p>
                                <p className="text-sm">{assignment.course || 'General'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CalendarDays className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Due Date</p>
                                <p className="text-sm">{formattedDueDate}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                            <Users className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Assigned To</p>
                                <p className="text-sm">{assignment.assigned_to_description || 'All students'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}