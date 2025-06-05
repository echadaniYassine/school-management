// src/components/admin/activities/AdminManageActivities.jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import ActivityApi from '../../../Services/Api/Admin/Activity'; // Adjust path if necessary
import ActivitiesList from '../Activities/ActivitiesList';
import UpsertActivityForm from '../Forms/UpsertActivityForm'; // Ensure this form is set up

// Simple loading skeleton for the activities list
const ActivitiesLoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-6 text-sm">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};


export default function AdminManageActivities() {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false); // For form submission state
    const [error, setError] = useState(null);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentActivityForUpsert, setCurrentActivityForUpsert] = useState(null);

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ActivityApi.getAll();
            setActivities(response.data.data || []);
        } catch (err) {
            console.error("Failed to fetch activities:", err);
            setError(err.response?.data?.message || "Failed to load activities. Please try again.");
            setActivities([]); // Clear activities on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleOpenCreateModal = () => {
        setCurrentActivityForUpsert(null);
        setError(null); // Clear previous form errors
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (activity) => {
        setCurrentActivityForUpsert(activity);
        setError(null); // Clear previous form errors
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentActivityForUpsert(null);
        // setError(null); // Clear form-specific errors when modal closes via cancel/X
    };

    const handleSaveActivity = async (activityDataFromForm) => {
        setError(null); // Clear general errors
        setIsSending(true);
        try {
            let savedActivity;
            if (currentActivityForUpsert && currentActivityForUpsert.id) {
                const response = await ActivityApi.update(currentActivityForUpsert.id, activityDataFromForm);
                savedActivity = response.data.data;
                setActivities(prevActivities =>
                    prevActivities.map(act =>
                        act.id === savedActivity.id ? savedActivity : act
                    )
                );
                // TODO: Show success toast: "Activity updated successfully!"
            } else {
                const response = await ActivityApi.create(activityDataFromForm);
                savedActivity = response.data.data;
                // Add to list and re-sort, or fetchActivities() for perfect backend sort
                setActivities(prevActivities => [...prevActivities, savedActivity].sort((a, b) => new Date(b.date) - new Date(a.date)));
                // TODO: Show success toast: "Activity created successfully!"
            }
            handleCloseUpsertModal();
        } catch (err) {
            console.error("Failed to save activity:", err);
            let errorMessage = "An unexpected error occurred while saving the activity.";
            if (err.response?.data?.errors) { // Laravel validation errors
                errorMessage = Object.values(err.response.data.errors).flat().join(' ');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage); // This error will be shown above the list, or inside the modal if you prefer
            // Do not close modal on error if it's a validation error, so user can correct
            // For other errors, you might still close it or let the user decide.
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        // Optionally, add a specific loading state for deletion if it's slow
        setError(null);
        try {
            await ActivityApi.delete(activityId);
            setActivities(prevActivities => prevActivities.filter(activity => activity.id !== activityId));
            // TODO: Show success toast: "Activity deleted successfully!"
        } catch (err) {
            console.error("Failed to delete activity:", err);
            setError(err.response?.data?.message || "Failed to delete activity. Please try again.");
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
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

                    {/* General error display area (for list loading or delete errors) */}
                    {error && !isUpsertModalOpen && ( // Only show general error if modal is not open (modal might have its own error display)
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading ? (
                        <ActivitiesLoadingSkeleton />
                    ) : activities.length === 0 && !error ? ( // Show "no activities" only if not loading and no error
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No activities found. Create your first activity to get started.</p>
                        </div>
                    ) : !error ? ( // Only render list if no error prevented loading
                        <ActivitiesList
                            activities={activities}
                            onEditActivity={handleOpenEditModal}
                            onDeleteActivity={handleDeleteActivity}
                        />
                    ) : null /* Error already displayed above */
                    }
                </CardContent>
            </Card>

            {isUpsertModalOpen && (
                <UpsertActivityForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) { // If modal is being closed (e.g., by pressing Esc or clicking outside)
                            handleCloseUpsertModal();
                        } else {
                            setIsUpsertModalOpen(true);
                        }
                    }}
                    onSubmit={handleSaveActivity}
                    initialData={currentActivityForUpsert}
                    dialogTitle={currentActivityForUpsert ? "Edit Activity" : "Create New Activity"}
                    dialogDescription={
                        currentActivityForUpsert
                            ? "Make changes to the activity details."
                            : "Add a new activity for students to participate in."
                    }
                    submitButtonText={currentActivityForUpsert ? "Update Activity" : "Create Activity"}
                    isSending={isSending} // Pass sending state to the form
                    // You might want to pass 'error' to the form if you want to display submission errors within the modal
                    // formError={isUpsertModalOpen ? error : null} // Example: pass error only if modal is open
                />
            )}
        </div>
    );
}