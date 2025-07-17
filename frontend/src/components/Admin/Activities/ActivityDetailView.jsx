// src/components/admin/activities/ActivityDetailView.jsx

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Info } from 'lucide-react';

export default function ActivityDetailView({ activity, isOpen, onOpenChange }) {
    if (!activity) return null;

    // Helper to format date nicely
    const formattedDate = activity.date 
        ? new Date(activity.date + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }) 
        : 'N/A';

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{activity.title || 'Activity Details'}</DialogTitle>
                    <DialogDescription>
                        A closer look at the "{activity.title}" activity.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    <p className="text-muted-foreground">{activity.description || 'No detailed description provided.'}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Date</p>
                                <p className="text-sm">{formattedDate}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Location</p>
                                <p className="text-sm">{activity.location || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Capacity</p>
                                <p className="text-sm">{typeof activity.capacity === 'number' ? `${activity.capacity} participants` : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 mt-1 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">Status</p>
                                <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                                    {activity.status ? activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 'Unknown'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}