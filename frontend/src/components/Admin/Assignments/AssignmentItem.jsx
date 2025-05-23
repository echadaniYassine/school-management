// src/components/admin/assignments/AssignmentItem.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // If you need view details button
import { CalendarDays, BookOpen, Users, FileText } from 'lucide-react';

// You might want different badge styles for different statuses
const getStatusBadgeClass = (status) => {
    const statusStyles = {
        Published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        Draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        Archived: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
    };
    return statusStyles[status] || "bg-blue-100 text-blue-800 border-blue-200"; // Default
};

export default function AssignmentItem({ assignment, onViewSubmissions }) { // onViewSubmissions is an example prop
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                            <Badge className={getStatusBadgeClass(assignment.status)}>
                                {assignment.status}
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
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                    </div>
                    {onViewSubmissions && (
                         <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onViewSubmissions(assignment.id)}
                            className="mt-2 sm:mt-0"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            View Submissions
                        </Button>
                    )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                     <p className="text-sm text-muted-foreground mb-1">
                        <Users className="h-4 w-4 inline mr-1" />
                        Assigned to: {assignment.assignedTo || 'N/A'}
                    </p>
                    {typeof assignment.submissionsReceived === 'number' && typeof assignment.totalStudents === 'number' && (
                        <p className="text-sm text-muted-foreground">
                            Submissions: {assignment.submissionsReceived} / {assignment.totalStudents}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}