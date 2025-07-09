// src/components/admin/Forms/TeachersUpsertForm.jsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 as Loader } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button.jsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

// Base schema for common fields
const baseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(50),
    email: z.string().email("Please enter a valid email address."),
    date_of_birth: z.string().nonempty("Date of birth is required."),
    gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
    address: z.string().nonempty("Address is required.").max(255),
    phone: z.string().regex(/^(?:\+212|0)[5-7]\d{8}$/, "Invalid Moroccan phone number format."),
});

// Schema for creating a user (password is required with confirmation)
const createSchema = baseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters."),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
});

// Schema for updating a user (password is optional, but if provided, must be confirmed)
const updateSchema = baseSchema.extend({
    password: z.string().min(8, "New password must be at least 8 characters.").optional().or(z.literal('')),
    password_confirmation: z.string().optional(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
});


/**
 * A reusable form for creating or updating a Teacher/User.
 *
 * @param {object} props
 * @param {object|null} props.initialData - The user data for editing, or null for creating.
 * @param {Function} props.onSubmit - The async function to call with form data for the API request.
 * @param {Function} props.onSuccess - The callback to run after a successful submission.
 * @param {boolean} props.isSending - Loading state passed from the parent.
 */
export default function TeacherUpsertForm({ initialData = null, onSubmit, onSuccess, isSending }) {
    const isUpdateMode = !!initialData;

    const form = useForm({
        resolver: zodResolver(isUpdateMode ? updateSchema : createSchema),
        defaultValues: {
            name: '', email: '', date_of_birth: '', gender: undefined,
            address: '', phone: '', password: '', password_confirmation: ''
        },
    });

    // Effect to reset the form fields when the initialData prop changes
    useEffect(() => {
        if (initialData) {
            form.reset({
                ...initialData,
                password: '', // Always clear password fields for security
                password_confirmation: '',
            });
        } else {
            form.reset(); // Reset to default empty values for create mode
        }
    }, [initialData, form.reset]);

    const handleFormSubmit = async (values) => {
        const toastId = toast.loading(isUpdateMode ? "Updating teacher..." : "Creating teacher...");

        try {
            // If updating and the password field is empty, do not send it to the backend.
            const submissionValues = { ...values };
            if (isUpdateMode && !submissionValues.password) {
                delete submissionValues.password;
                delete submissionValues.password_confirmation;
            }

            // Call the submission handler passed from the parent component
            await onSubmit(submissionValues);

            toast.success(isUpdateMode ? "Teacher updated successfully!" : "Teacher created successfully!", {
                id: toastId,
            });

            if (onSuccess) onSuccess(); // Trigger parent's success action (e.g., close modal, refetch data)

        } catch (error) {
            // Handle server-side validation errors from Laravel
            if (error.response?.data?.errors) {
                Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                    form.setError(field, { type: 'server', message: messages.join(', ') });
                });
                toast.error("Please correct the form errors.", { id: toastId });
            } else {
                toast.error(error.response?.data?.message || "An unexpected error occurred.", { id: toastId });
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-1 pr-4">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email <span className="text-red-500">*</span></FormLabel><FormControl><Input type="email" placeholder="teacher@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone <span className="text-red-500">*</span></FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="date_of_birth" render={({ field }) => ( <FormItem><FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                
                <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4 pt-2">
                                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea placeholder="Teacher's full address" {...field} /></FormControl><FormMessage /></FormItem> )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="password" render={({ field }) => (
                         <FormItem>
                             <FormLabel>{isUpdateMode ? "New Password (Optional)" : "Password"} {!isUpdateMode && <span className="text-red-500">*</span>}</FormLabel>
                             <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                             <FormMessage />
                         </FormItem>
                     )} />
                     <FormField control={form.control} name="password_confirmation" render={({ field }) => (
                         <FormItem>
                             <FormLabel>Confirm Password</FormLabel>
                             <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                             <FormMessage />
                         </FormItem>
                     )} />
                </div>

                <Button type="submit" className="w-full" disabled={isSending}>
                    {isSending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdateMode ? "Update Teacher" : "Create Teacher"}
                </Button>
            </form>
        </Form>
    );
}