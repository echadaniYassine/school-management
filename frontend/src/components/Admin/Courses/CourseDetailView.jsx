// src/components/admin/courses/CourseDetailView.jsx

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function CourseDetailView({ course, isOpen, onOpenChange }) {
    // Return null if no course is selected, to prevent errors
    if (!course) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
                    <DialogDescription>
                        Instructor: {course.instructor || 'N/A'}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    {course.thumbnailUrl && (
                        <div className="w-full aspect-video overflow-hidden rounded-lg border">
                            <img 
                                src={course.thumbnailUrl} 
                                alt={course.title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    )}
                    <div className="prose dark:prose-invert max-w-none">
                        <p>{course.description || "No description provided."}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground">CATEGORY</p>
                            <p>{course.category || 'Uncategorized'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground">LEVEL</p>
                            <Badge variant="outline">{course.level || 'All Levels'}</Badge>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground">DURATION</p>
                            <p>{course.duration || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-xs font-semibold text-muted-foreground">PRICE</p>
                            <p className="font-semibold">{course.price === 0 ? 'Free' : `$${course.price}`}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}