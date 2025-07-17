import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

export default function AssignmentDetailView({ assignment, isOpen, onOpenChange, onDownload }) {
    if (!assignment) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">{assignment.title}</DialogTitle>
                    <DialogDescription>Due: {new Date(assignment.due_date).toLocaleDateString()}</DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto">
                    <p>{assignment.description}</p>
                </div>
                {assignment.instructions_file_path && (
                    <DialogFooter>
                        <Button onClick={() => onDownload(assignment.id, assignment.title)}>
                            <Download className="mr-2 h-4 w-4" /> Download Instructions
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}