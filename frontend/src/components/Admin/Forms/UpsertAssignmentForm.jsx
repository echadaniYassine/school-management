import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    // DialogClose, // We'll use onOpenChange for closing
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For displaying errors
import { CalendarIcon, UploadCloud, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns"; // parseISO for initialData
import { cn } from "@/lib/utils";


// These should ideally match or be derived from backend/shared constants
const STATUS_OPTIONS = ["draft", "published", "archived", "grading", "graded"];
const COURSE_OPTIONS = ["Mathematics 101", "World History", "Physics 201", "English Literature", "Computer Science Basics", "Other"]; // Added "Other"

export default function UpsertAssignmentForm({
    isOpen,
    onOpenChange, // This prop from Dialog will handle closing
    onSubmit,
    initialData,
    dialogTitle,
    dialogDescription,
    submitButtonText,
    isSending,
    formError // Optional: to display errors from parent (passed from AdminManageAssignments)
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [dueDate, setDueDate] = useState(null); // Date object
    const [status, setStatus] = useState(STATUS_OPTIONS[0]);
    const [assignedToDescription, setAssignedToDescription] = useState('');
    
    const [instructionsFile, setInstructionsFile] = useState(null); // File object for new upload
    const [existingFileName, setExistingFileName] = useState(''); // Display name of current file
    const [removeInstructionsFile, setRemoveInstructionsFile] = useState(false);
    
    const [localError, setLocalError] = useState(''); // For simple client-side validation

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen && initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setCourse(initialData.course || '');
            setDueDate(initialData.dueDate ? parseISO(initialData.dueDate) : null); // Parse ISO string to Date
            setStatus(initialData.status || STATUS_OPTIONS[0]);
            setAssignedToDescription(initialData.assignedTo || '');
            // For file, check 'hasInstructionsFile' and potentially display original filename
            // This is tricky without knowing the exact original filename from backend.
            // For simplicity, we'll just indicate if a file exists.
            setExistingFileName(initialData.hasInstructionsFile ? `Existing Instructions File (e.g., ${initialData.title}-instructions)` : '');
            setInstructionsFile(null);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
            setRemoveInstructionsFile(false);
        } else if (isOpen && !initialData) {
            // Reset form for "create" mode
            setTitle('');
            setDescription('');
            setCourse(COURSE_OPTIONS[0] === "Other" ? '' : COURSE_OPTIONS[0]); // Default to first or empty if "Other"
            setDueDate(null);
            setStatus(STATUS_OPTIONS[0]);
            setAssignedToDescription('');
            setInstructionsFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setExistingFileName('');
            setRemoveInstructionsFile(false);
        }
        setLocalError(''); // Clear errors when modal opens or data changes
    }, [initialData, isOpen]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInstructionsFile(file);
            setExistingFileName(''); // Clear placeholder for existing file if new one is chosen
            setRemoveInstructionsFile(false); // Uncheck remove if new file is selected
        } else {
            setInstructionsFile(null);
        }
    };

    const validateForm = () => {
        if (!title.trim()) {
            setLocalError("Title is required.");
            return false;
        }
        if (!dueDate) {
            setLocalError("Due date is required.");
            return false;
        }
        // Add more validations as needed
        setLocalError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('course', course);
        if (dueDate) formData.append('due_date', format(dueDate, 'yyyy-MM-dd'));
        formData.append('status', status);
        formData.append('assigned_to_description', assignedToDescription);

        if (instructionsFile) {
            formData.append('instructions_file', instructionsFile);
        }
        if (removeInstructionsFile && initialData && initialData.hasInstructionsFile) {
            formData.append('instructions_file_remove', 'true');
        }
        
        onSubmit(formData); // Pass FormData to parent
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    {dialogDescription && <DialogDescription>{dialogDescription}</DialogDescription>}
                </DialogHeader>

                {(localError || formError) && (
                    <Alert variant="destructive" className="my-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{localError || formError}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 py-4 pr-2"> {/* Added pr-2 for scrollbar */}
                    <div>
                        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Calculus Chapter 1 Problems" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed instructions or context for the assignment..." rows={4} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="course">Course</Label>
                             <Select value={course} onValueChange={setCourse}>
                                <SelectTrigger id="course-select">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COURSE_OPTIONS.map(opt => (
                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {course === "Other" && <Input className="mt-2" placeholder="Specify course name" onChange={e => setCourse(e.target.value)} />}
                        </div>
                         <div>
                            <Label htmlFor="dueDate">Due Date <span className="text-red-500">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="dueDate"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={setDueDate}
                                        initialFocus
                                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} // Disable past dates
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                   

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="assignedToDescription">Assigned To (Description)</Label>
                        <Textarea id="assignedToDescription" value={assignedToDescription} onChange={(e) => setAssignedToDescription(e.target.value)} placeholder="e.g., All Grade 10 Students, Section B Physics Class" />
                    </div>

                    <div>
                        <Label htmlFor="instructionsFile">Instructions File (Optional)</Label>
                        <div className="flex items-center space-x-2 mt-1">
                            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <UploadCloud className="mr-2 h-4 w-4" />
                                {instructionsFile ? "Change File" : "Upload File"}
                            </Button>
                            <input
                                type="file"
                                id="instructionsFile"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt,.zip" // Define acceptable file types
                            />
                            {instructionsFile && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{instructionsFile.name}</span>}
                        </div>
                        
                        {initialData && initialData.hasInstructionsFile && !instructionsFile && (
                            <div className="mt-2 text-sm text-muted-foreground items-center flex">
                                Current file: <span className="ml-1 italic">{existingFileName || "Instructions file uploaded"}</span>
                                <div className="flex items-center space-x-2 ml-4">
                                    <Checkbox
                                        id="removeFile"
                                        checked={removeInstructionsFile}
                                        onCheckedChange={setRemoveInstructionsFile}
                                    />
                                    <Label htmlFor="removeFile" className="text-xs font-normal">Remove current file</Label>
                                </div>
                            </div>
                        )}
                         {!instructionsFile && !initialData?.hasInstructionsFile && (
                             <p className="text-xs text-muted-foreground mt-1">No file selected or previously uploaded.</p>
                         )}

                    </div>


                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSending}>
                            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {submitButtonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}