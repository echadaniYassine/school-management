// src/components/admin/activities/ActivityItem.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Calendar, MapPin, Users } from 'lucide-react';

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        active: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
    };
    return statusStyles[status] || statusStyles.draft;
};

const getCategoryBadgeClass = (category) => {
    const categoryStyles = {
        academic: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
        sports: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
        cultural: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
        social: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100"
    };
    return categoryStyles[category] || categoryStyles.academic;
};

export default function ActivityItem({ activity, onEdit, onDelete }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4 flex-col sm:flex-row"> {/* Adjusted for better responsiveness */}
                    <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold">{activity.title}</h3>
                            <Badge className={getStatusBadgeClass(activity.status)}>
                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </Badge>
                            <Badge className={getCategoryBadgeClass(activity.category)}>
                                {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{activity.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(activity.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {activity.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Max {activity.capacity} participants
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-4"> {/* Adjusted margin */}
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
                                        "{activity.title}" and remove all associated data.
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