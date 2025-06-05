// src/components/admin/activities/TeacherActivities.jsx
// Or better, rename to src/components/teacher/activities/TeacherManageActivities.jsx
// and update import paths accordingly if you move it.

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

// Assuming ActivityApi.js is located at 'src/Api/ActivityApi.js'
// and this component is at 'src/components/admin/activities/AdminManageActivities.jsx'
// The import path would be:
import ActivityApi from '../../Services/Api/Admin/Activity';
// If ActivityApi.js is elsewhere, adjust the path:
// e.g., import ActivityApi from '../../Services/Api/Admin/Activity'; // Your original path

// Import sub-components (ensure paths are correct)
import ActivitiesList from '../Admin/Activities/ActivitiesList'; // Or a teacher-specific list if needed
import UpsertActivityForm from '../Admin/Forms/UpsertActivityForm'; // Or a teacher-specific form

// Simple loading skeleton for the activities list (remains the same)
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

// If this component is specifically for teachers, rename the function for clarity
// e.g., export default function TeacherManageActivities()
export default function TeacherActivities() { // Removed userRole prop
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentActivityForUpsert, setCurrentActivityForUpsert] = useState(null);

    // **** THIS IS THE CRITICAL CHANGE ****
    // Hardcode the role if this component is specifically for teachers
    const userRole = 'teacher';

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Use the hardcoded userRole
            const response = await ActivityApi.getAll(userRole);
            setActivities(response.data.data || []);
        } catch (err) {
            console.error(`Failed to fetch activities for role ${userRole}:`, err);
            setError(err.response?.data?.message || "Failed to load activities. Please try again.");
            setActivities([]);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]); // userRole is now a constant from within the component scope

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleOpenCreateModal = () => {
        setCurrentActivityForUpsert(null);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (activity) => {
        setCurrentActivityForUpsert(activity);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentActivityForUpsert(null);
    };

    const handleSaveActivity = async (activityDataFromForm) => {
        setError(null);
        setIsSending(true);
        try {
            let savedActivity;
            if (currentActivityForUpsert && currentActivityForUpsert.id) {
                // Use the hardcoded userRole
                const response = await ActivityApi.update(currentActivityForUpsert.id, activityDataFromForm, userRole);
                savedActivity = response.data.data;
                setActivities(prevActivities =>
                    prevActivities.map(act =>
                        act.id === savedActivity.id ? savedActivity : act
                    )
                );
            } else {
                // Use the hardcoded userRole
                const response = await ActivityApi.create(activityDataFromForm, userRole);
                savedActivity = response.data.data;
                setActivities(prevActivities => [...prevActivities, savedActivity].sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
            handleCloseUpsertModal();
        } catch (err) {
            console.error(`Failed to save activity for role ${userRole}:`, err);
            let errorMessage = "An unexpected error occurred while saving the activity.";
            if (err.response?.data?.errors) {
                errorMessage = Object.values(err.response.data.errors).flat().join(' ');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
            // Optionally, re-open modal or keep it open if error is for validation.
            // For now, it stays closed on error and shows general error message.
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        setError(null);
        // Consider adding a confirmation dialog here
        // if (!window.confirm("Are you sure you want to delete this activity?")) return;

        try {
            // Use the hardcoded userRole
            await ActivityApi.delete(activityId, userRole);
            setActivities(prevActivities => prevActivities.filter(activity => activity.id !== activityId));
        } catch (err) {
            console.error(`Failed to delete activity for role ${userRole}:`, err);
            setError(err.response?.data?.message || "Failed to delete activity. Please try again.");
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    {/* You can make the title dynamic or specific if needed */}
                    <CardTitle className="text-2xl font-bold">Manage Activities ({userRole === 'teacher' ? 'Teacher View' : 'Admin View'})</CardTitle>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        Add Activity
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Manage all student activities including creation, editing, and deletion.
                    </p>

                    {/* Error display for general page errors (not form validation) */}
                    {error && !isUpsertModalOpen && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading ? (
                        <ActivitiesLoadingSkeleton />
                    ) : activities.length === 0 && !error ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No activities found. Create your first activity to get started.</p>
                        </div>
                    ) : !error ? ( // Only render list if no general loading error
                        <ActivitiesList
                            activities={activities}
                            onEditActivity={handleOpenEditModal}
                            onDeleteActivity={handleDeleteActivity}
                        />
                    ) : null // If there was a loading error, error message is already shown
                    }
                </CardContent>
            </Card>

            {isUpsertModalOpen && (
                <UpsertActivityForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={(isOpen) => { // Standard way to handle shadcn dialog onOpenChange
                        if (!isOpen) {
                            handleCloseUpsertModal();
                        } else {
                            setIsUpsertModalOpen(true); // Should not be needed if isOpen is true
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
                    submitButtonText={isSending ? (currentActivityForUpsert ? "Updating..." : "Creating...") : (currentActivityForUpsert ? "Update Activity" : "Create Activity")}
                    isSending={isSending}
                    // Pass form-specific errors to the form if you want to display them there
                    // formError={isUpsertModalOpen && error ? error : null}
                />
            )}
        </div>
    );
}