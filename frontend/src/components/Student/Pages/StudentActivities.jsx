// src/components/Student/Pages/StudentActivities.jsx

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ListChecks } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ActivityApi from "../../../Services/Api/Activity";
import ActivityDetailView from '../views/ActivityDetailView'; // <-- Import

const StudentActivitiesLoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default function StudentActivities() {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userRole = 'student';

    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ActivityApi.getAll(userRole);
            setActivities(response.data?.data || []);
        } catch (err) {
            console.error(`Failed to fetch activities for role ${userRole}:`, err);
            setError(err.response?.data?.message || "Failed to load activities. Please try again.");
            setActivities([]);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleViewActivity = (activity) => {
        setSelectedActivity(activity);
        setIsViewOpen(true);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <ListChecks className="mr-2 h-6 w-6" />
                        Available Activities
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Here are the current activities you can participate in or view.
                    </p>

                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading ? (
                        <StudentActivitiesLoadingSkeleton />
                    ) : !error && activities.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No activities are currently available.</p>
                        </div>
                    ) : !error && activities.length > 0 ? (
                        <div className="space-y-4">
                            {activities.map(activity => (
                                <Card key={activity.id} onClick={() => handleViewActivity(activity)} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{activity.title || "Untitled Activity"}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {activity.description || "No description available."}
                                        </p>
                                        {activity.date && (
                                            <p className="text-xs text-gray-500 mt-2">Date: {new Date(activity.date).toLocaleDateString()}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : null}
                </CardContent>
            </Card>
            <ActivityDetailView activity={selectedActivity} isOpen={isViewOpen} onOpenChange={setIsViewOpen} />

        </div>
    );
}