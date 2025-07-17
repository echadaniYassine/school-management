import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function CourseDetailView({ course, isOpen, onOpenChange }) {
    if (!course) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{course.title}</DialogTitle>
                    <DialogDescription>Instructor: {course.instructor || 'N/A'}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    {course.thumbnailUrl && <img src={course.thumbnailUrl} alt={course.title} className="w-full h-auto object-cover rounded-md" />}
                    <div className="prose dark:prose-invert max-w-none"><p>{course.description}</p></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}