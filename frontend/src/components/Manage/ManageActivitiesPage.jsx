// src/components/shared/ManageActivitiesPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, AlertCircle } from 'lucide-react';

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import ActivityApi from '../../Services/Api/Activity';
import ActivitiesList from '../Admin/Activities/ActivitiesList'; // Re-use the same list component
import UpsertActivityForm from '../Admin/Forms/UpsertActivityForm'; // Re-use the same form component

const ActivitiesLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i}><CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 space-y-2"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /></div>
                    <div className="flex items-center gap-2"><Skeleton className="h-8 w-16" /><Skeleton className="h-8 w-16" /></div>
                </div>
            </CardContent></Card>
        ))}
    </div>
);

/**
 * A reusable component to manage activities for different user roles.
 * @param {{ userRole: 'admin' | 'teacher' }} props
 */
export default function ManageActivitiesPage({ userRole }) {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ActivityApi.getAll({ role: userRole });
            setActivities(response.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load activities.");
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleOpenCreateModal = () => {
        setCurrentActivity(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (activity) => {
        setCurrentActivity(activity);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSaveActivity = async (formData) => {
        setIsSending(true);
        try {
            if (currentActivity?.id) {
                await ActivityApi.update({ role: userRole, id: currentActivity.id, formData });
                toast.success("Activity updated successfully!");
            } else {
                await ActivityApi.create({ role: userRole, formData });
                toast.success("Activity created successfully!");
            }
            handleCloseModal();
            fetchActivities(); // Refresh the list
        } catch (error) {
            const errorMessages = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : "Failed to save activity.";
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return;
        try {
            await ActivityApi.delete({ role: userRole, id: activityId });
            toast.success("Activity deleted successfully!");
            setActivities(prev => prev.filter(act => act.id !== activityId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete activity.");
        }
    };

    const pageTitle = userRole === 'admin' ? 'Manage All Activities' : 'My Activities';

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{pageTitle}</CardTitle>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        Add Activity
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <ActivitiesLoadingSkeleton />
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : activities.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No activities found. Create one to get started.
                        </div>
                    ) : (
                        <ActivitiesList
                            activities={activities}
                            onEditActivity={handleOpenEditModal}
                            onDeleteActivity={handleDeleteActivity}
                        />
                    )}
                </CardContent>
            </Card>

            {isModalOpen && (
                <UpsertActivityForm
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onSubmit={handleSaveActivity}
                    initialData={currentActivity}
                    isSending={isSending}
                />
            )}
        </div>
    );
}