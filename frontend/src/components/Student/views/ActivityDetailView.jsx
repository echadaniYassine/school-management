import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users } from 'lucide-react';

export default function ActivityDetailView({ activity, isOpen, onOpenChange }) {
    if (!activity) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">{activity.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <p className="text-muted-foreground">{activity.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex gap-2"><Calendar size={16} /><p>Date: {new Date(activity.date).toLocaleDateString()}</p></div>
                        <div className="flex gap-2"><MapPin size={16} /><p>Location: {activity.location}</p></div>
                        <div className="flex gap-2"><Users size={16} /><p>Capacity: {activity.capacity} participants</p></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}