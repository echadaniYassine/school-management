// src/components/forms/StudentUpsertForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Import your shadcn/ui components
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// --- Base schema for fields that are always present ---
const baseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(50),
    email: z.string().email("Please enter a valid email address."),
    date_of_birth: z.string().nonempty("Date of birth is required."),
    gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
    address: z.string().nonempty("Address is required.").max(255),
    phone: z.string().regex(/^(?:\+212|0)[5-7]\d{8}$/, "Invalid Moroccan phone number."),
});

// --- Schema for creating a new user (password is required) ---
const createSchema = baseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters."),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
});

// --- Schema for updating a user (password is optional) ---
const updateSchema = baseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
    password_confirmation: z.string().optional(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
});

export default function StudentUpsertForm({ initialData = null, onSubmit, onSuccess }) {
    const isUpdateMode = !!initialData;

    const form = useForm({
        resolver: zodResolver(isUpdateMode ? updateSchema : createSchema),
        defaultValues: initialData || {
            name: '', email: '', date_of_birth: '', gender: '', address: '', phone: '', password: '', password_confirmation: ''
        },
    });

    const { formState: { isSubmitting }, setError } = form;

    const handleFormSubmit = async (values) => {
        const toastId = toast.loading(isUpdateMode ? "Updating student..." : "Creating student...");

        try {
            // If updating and password field is empty, don't send it to the backend.
            if (isUpdateMode && !values.password) {
                delete values.password;
                delete values.password_confirmation;
            }

            // This calls the function passed from the parent component
            await onSubmit(values);

            toast.success(isUpdateMode ? "Student updated successfully!" : "Student created successfully!", { id: toastId });

            form.reset();
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error("Form Submission Error:", error);
            const response = error.response;
            if (response?.data?.errors) {
                Object.entries(response.data.errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { message: errorMessages.join(", ") });
                });
                toast.error("Please correct the errors in the form.", { id: toastId });
            } else {
                const errorMessage = response?.data?.message || error.message || "An unexpected error occurred.";
                toast.error(errorMessage, { id: toastId });
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* ... your entire JSX form structure ... it is correct and does not need changes ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="date_of_birth" render={({ field }) => ( <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem><FormLabel>Gender</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center space-x-4"> <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem> <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem> </RadioGroup></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea placeholder="Full address" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password {isUpdateMode && "(Optional)"}</FormLabel> <FormControl><Input type="password" placeholder="********" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="password_confirmation" render={({ field }) => ( <FormItem> <FormLabel>Confirm Password</FormLabel> <FormControl><Input type="password" placeholder="********" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdateMode ? "Update Student" : "Create Student"}
                </Button>
            </form>
        </Form>
    );
}