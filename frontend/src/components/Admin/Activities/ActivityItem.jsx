// src/components/admin/activities/ActivityItem.jsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit2, MapPin, Trash2, Users } from 'lucide-react';
import { Eye } from 'lucide-react'; // Import the Eye icon for viewing

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        active: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
        default: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100" // Added a default
    };
    // Ensure status is a string, convert to lowercase for matching, and fallback
    const key = typeof status === 'string' ? status.toLowerCase() : 'default';
    return statusStyles[key] || statusStyles.default;
};

const getCategoryBadgeClass = (category) => {
    const categoryStyles = {
        academic: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
        sports: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
        cultural: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
        social: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100",
        default: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100" // Added a default
    };
    // Ensure category is a string, convert to lowercase for matching, and fallback
    const key = typeof category === 'string' ? category.toLowerCase() : 'default';
    return categoryStyles[key] || categoryStyles.default;
};

export default function ActivityItem({ activity, onEdit, onDelete, onView }) {
    // **DEBUGGING: Log the activity object to see its structure**
    // console.log("ActivityItem received activity:", JSON.stringify(activity, null, 2));

    if (!activity) {
        // This case should ideally be caught by ActivitiesList, but good to have
        return <Card><CardContent>Activity data is missing.</CardContent></Card>;
    }

    // Helper to safely format properties like status and category for display
    const formatPropertyDisplay = (value) => {
        if (typeof value === 'string' && value.length > 0) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return 'N/A'; // Fallback for undefined or empty string
    };

    const displayStatus = formatPropertyDisplay(activity.status);
    const displayCategory = formatPropertyDisplay(activity.category);

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4 flex-col sm:flex-row">
                    <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold">{activity.title || 'Untitled Activity'}</h3>
                            {/* Use the safely formatted displayStatus and ensure activity.status is passed to badge class func */}
                            <Badge className={getStatusBadgeClass(activity.status)}>
                                {displayStatus}
                            </Badge>
                            {/* Use the safely formatted displayCategory and ensure activity.category is passed to badge class func */}
                            <Badge className={getCategoryBadgeClass(activity.category)}>
                                {displayCategory}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{activity.description || 'No description available.'}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {activity.date ? new Date(activity.date).toLocaleDateString() : 'No date'}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {activity.location || 'No location'}
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Max {typeof activity.capacity === 'number' ? activity.capacity : 'N/A'} participants
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onView(activity)}
                            className="flex items-center gap-1"
                        >
                            <Eye className="h-4 w-4" />
                            View
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(activity)}
                            className="flex items-center gap-1"
                        >
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the activity
                                        "{activity.title || 'this activity'}" and remove all associated data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelete(activity.id)} className="bg-red-600 hover:bg-red-700">
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