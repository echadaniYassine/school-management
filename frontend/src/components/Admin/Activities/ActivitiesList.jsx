// src/components/admin/Activities/ActivitiesList.jsx
import React from 'react';
// Corrected import path for ActivityItem:
// Assuming ActivityItem.jsx is in src/components/admin/activities/
import ActivityItem from '../activities/ActivityItem'; 

export default function ActivitiesList({ activities, onEditActivity, onDeleteActivity }) {
    if (!activities || activities.length === 0) { // Added a check for !activities
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No activities found. Create your first activity to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                />
            ))}
        </div>
    );
}