// src/components/admin/activities/AdminManageActivities.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Removed unused DialogTrigger: import { DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

// Assuming ActivitiesList.jsx is in src/components/admin/Activities/
import ActivitiesList from '../Activities/ActivitiesList'; 
// Assuming UpsertActivityForm.jsx is in src/components/admin/activities/ (same folder)
import UpsertActivityForm from '../Forms/UpsertActivityForm'; 

const initialActivitiesData = [
    {
        id: 1,
        title: "Math Competition",
        description: "Annual mathematics competition for all grade levels",
        date: "2024-06-15",
        location: "Main Auditorium",
        capacity: 200,
        status: "active",
        category: "academic"
    },
    {
        id: 2,
        title: "Sports Day",
        description: "Inter-house sports competition with various events",
        date: "2024-06-20",
        location: "Sports Complex",
        capacity: 500,
        status: "active",
        category: "sports"
    },
    {
        id: 3,
        title: "Science Fair",
        description: "Student science project exhibition and competition",
        date: "2024-06-25",
        location: "Science Building",
        capacity: 150,
        status: "draft",
        category: "academic"
    }
];

export default function AdminManageActivities() {
    const [activities, setActivities] = useState(initialActivitiesData);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentActivityForUpsert, setCurrentActivityForUpsert] = useState(null);

    const handleOpenCreateModal = () => {
        setCurrentActivityForUpsert(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (activity) => {
        setCurrentActivityForUpsert(activity);
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentActivityForUpsert(null);
    };

    const handleSaveActivity = (activityData) => {
        if (currentActivityForUpsert && currentActivityForUpsert.id) {
            setActivities(prevActivities =>
                prevActivities.map(act =>
                    act.id === currentActivityForUpsert.id ? { ...act, ...activityData } : act
                )
            );
        } else {
            const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
            const newActivity = {
                id: newId,
                ...activityData
            };
            setActivities(prevActivities => [...prevActivities, newActivity]);
        }
        handleCloseUpsertModal();
    };

    const handleDeleteActivity = (activityId) => {
        setActivities(prevActivities => prevActivities.filter(activity => activity.id !== activityId));
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl font-bold">Manage Activities</CardTitle>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        Add Activity
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Manage all student activities including creation, editing, and deletion.
                    </p>
                    <ActivitiesList
                        activities={activities}
                        onEditActivity={handleOpenEditModal}
                        onDeleteActivity={handleDeleteActivity}
                    />
                </CardContent>
            </Card>

            {isUpsertModalOpen && (
                <UpsertActivityForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={setIsUpsertModalOpen}
                    onSubmit={handleSaveActivity}
                    initialData={currentActivityForUpsert}
                    dialogTitle={currentActivityForUpsert ? "Edit Activity" : "Create New Activity"}
                    dialogDescription={
                        currentActivityForUpsert
                            ? "Make changes to the activity details."
                            : "Add a new activity for students to participate in."
                    }
                    submitButtonText={currentActivityForUpsert ? "Update Activity" : "Create Activity"}
                />
            )}
        </div>
    );
}