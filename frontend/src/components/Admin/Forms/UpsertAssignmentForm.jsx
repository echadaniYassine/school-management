// src/components/Admin/Forms/UpsertAssignmentForm.jsx

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';

// Shadcn/ui and custom components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Constants
const STATUS_OPTIONS = ["draft", "published", "archived", "grading", "graded"];
const COURSE_OPTIONS = ["Mathematics 101", "World History", "Physics 201", "English Literature", "Computer Science Basics"];

// Zod validation schema (this remains the same)
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  course: z.string().min(1, { message: "Please select a course." }),
  due_date: z.date({ required_error: "A due date is required." }),
  status: z.string(),
  assigned_to_description: z.string().optional(),
  instructions_file: z.any().optional(),
  remove_instructions_file: z.boolean().default(false),
});

export default function UpsertAssignmentForm({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  isSending,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      course: '',
      due_date: undefined,
      status: STATUS_OPTIONS[0],
      assigned_to_description: '',
      instructions_file: undefined,
      remove_instructions_file: false,
    },
  });

  // This useEffect correctly resets the form when the modal opens.
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          title: initialData.title || '',
          description: initialData.description || '',
          course: initialData.course || '',
          due_date: initialData.due_date ? parseISO(initialData.due_date) : undefined,
          status: initialData.status || STATUS_OPTIONS[0],
          assigned_to_description: initialData.assigned_to_description || '',
          remove_instructions_file: false,
        });
      } else {
        form.reset();
      }
    }
  }, [initialData, isOpen, form]);

  // This submission handler correctly prepares the data.
  const handleFormSubmit = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'due_date' && value instanceof Date) {
        formData.append(key, format(value, 'yyyy-MM-dd'));
      } else if (key === 'instructions_file' && value instanceof FileList && value.length > 0) {
        formData.append('instructions_file', value[0]);
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    onSubmit(formData);
  };

  const dialogTitle = initialData ? "Edit Assignment" : "Create New Assignment";
  const submitButtonText = isSending
    ? (initialData ? "Saving..." : "Creating...")
    : (initialData ? "Save Changes" : "Create Assignment");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Fill in the assignment details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4 pr-2">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Title <span className="text-red-500">*</span></FormLabel> <FormControl><Input {...field} placeholder="e.g., Chapter 1 Problems" /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea {...field} rows={3} placeholder="Provide detailed instructions..." /></FormControl> <FormMessage /> </FormItem> )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger></FormControl>
                      <SelectContent>{COURSE_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- THIS IS THE CORRECT NATIVE DATE INPUT IMPLEMENTATION --- */}
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        // Convert the Date object from the form state to a "yyyy-MM-dd" string for the input
                        value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const dateString = e.target.value;
                          // When the input changes, convert the string back to a Date object
                          // or undefined if the input is cleared.
                          // Appending T00:00:00 avoids timezone bugs.
                          field.onChange(dateString ? new Date(dateString + 'T00:00:00') : undefined);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField control={form.control} name="status" render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <Select onValueChange={field.onChange} value={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl> <SelectContent>{STATUS_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</SelectItem>)}</SelectContent> </Select> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="instructions_file" render={() => ( <FormItem> <FormLabel>Instructions File (Optional)</FormLabel> <FormControl><Input type="file" accept=".pdf,.doc,.docx,.zip" {...form.register("instructions_file")} /></FormControl> <FormMessage /> </FormItem> )} />
            {initialData?.instructions_file_path && ( <FormField control={form.control} name="remove_instructions_file" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"> <FormLabel>Remove current instructions file</FormLabel> <p className="text-xs text-muted-foreground">Check this box to delete the existing file upon saving.</p> </div> </FormItem> )} /> )}
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>Cancel</Button>
              <Button type="submit" disabled={isSending}>
                {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}