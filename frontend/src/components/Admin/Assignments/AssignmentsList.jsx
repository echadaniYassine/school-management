// src/components/admin/assignments/AssignmentsList.jsx
import React from 'react';
import AssignmentItem from './AssignmentItem';

export default function AssignmentsList({
    assignments,
    onViewSubmissions,
    onEditAssignment,    // New prop
    onDeleteAssignment,  // New prop
    onDownloadInstructions // New prop
}) {
    if (!assignments || assignments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No assignments available to display.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {assignments.map((assignment) => (
                <AssignmentItem
                    key={assignment.id}
                    assignment={assignment}
                    onViewSubmissions={onViewSubmissions}
                    onEdit={onEditAssignment}         // Pass down
                    onDelete={onDeleteAssignment}       // Pass down
                    onDownload={onDownloadInstructions} // Pass down
                />
            ))}
        </div>
    );
}