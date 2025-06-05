// src/components/admin/Forms/TeacherUpsertForm.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as Loader } from "lucide-react"; // Renamed for clarity
import { useEffect } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../ui/button.jsx";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "../../ui/form.jsx";
import { Input } from "../../ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.jsx";
import { Textarea } from "../../ui/textarea.jsx";

const baseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
    date_of_birth: z.string().nonempty("Date of birth is required")
                     .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format"}),
    gender: z.enum(["male", "female"], {
        required_error: "Gender is required", // More specific error message
    }),
    address: z.string().max(255, "Address is too long").optional().or(z.literal('')), // Optional address
    phone: z
        .string()
        .min(10, "Phone number is too short") // General phone validation
        .max(15, "Phone number is too long")
        .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid phone number format"),
        // Removed Morocco specific regex for broader use, adjust if needed
    email: z.string().email("Invalid email").min(2, "Email is too short").max(100, "Email is too long"), // Increased max length
});

const createSchema = baseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters").max(30, "Password is too long"),
    // Add password confirmation if needed for creation
    // password_confirmation: z.string().min(8, "Password confirmation is required"),
})
// .refine(data => data.password === data.password_confirmation, {
//     message: "Passwords do not match",
//     path: ["password_confirmation"], // path of error
// });

const updateSchema = baseSchema.extend({
    password: z.string().min(8, "Password must be at least 8 characters").max(30).optional().or(z.literal('')),
    // password_confirmation: z.string().optional().or(z.literal('')),
})
// .refine(data => data.password === data.password_confirmation, {
//     message: "Passwords do not match",
//     path: ["password_confirmation"],
// });

export default function TeacherUpsertForm({ handleSubmit, values, onSuccess }) {
    const isUpdate = !!values && !!values.id; // More robust check for update

    const form = useForm({
        resolver: zodResolver(isUpdate ? updateSchema : createSchema),
        defaultValues: values || { // Provide default structure for create
            name: '',
            date_of_birth: '',
            gender: undefined, // Or 'male' / 'female' if you want a default
            address: '',
            phone: '',
            email: '',
            password: '',
        },
    });

    const {
        setError,
        formState: { isSubmitting, errors }, // Destructure errors for direct use
        reset,
    } = form;

    // Reset form when initial values change (e.g., when opening sheet for different teacher)
    useEffect(() => {
     if (isUpdate && values) {
         reset({
             ...values,
             password: '', // Always clear password field for update form
         });
     } else if (!isUpdate) {
         reset({ // Default structure for create
            name: '', date_of_birth: '', gender: undefined,
            address: '', phone: '', email: '', password: '',
         });
     }
    }, [values, isUpdate, reset]);


    const onSubmit = async (formValues) => {
        const loaderMsg = isUpdate ? "Updating teacher..." : "Adding teacher...";
        const loader = toast.loading(loaderMsg);

        // For update, if password field is empty, don't send it
        const submissionValues = { ...formValues };
        if (isUpdate && (submissionValues.password === undefined || submissionValues.password === '')) {
            delete submissionValues.password;
        }

        try {
            // The handleSubmit prop is now directly the API call
            const response = await handleSubmit(submissionValues);
            // Assuming parent component (AdminTeachersList) handles success toast and state update
            // Parent will call onSuccess if provided (which closes the sheet)
            if (onSuccess) onSuccess(response.data.data); // Pass back created/updated teacher
            reset(); // Reset form on successful submission
        } catch (error) {
            const responseError = error.response;
            if (responseError?.data?.errors) {
                Object.entries(responseError.data.errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { type: 'server', message: errorMessages.join(", ") });
                });
                toast.error("Please correct the form errors.");
            } else {
                toast.error(responseError?.data?.message || "An unexpected error occurred.");
            }
        } finally {
            toast.dismiss(loader);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 max-h-[80vh] overflow-y-auto p-1 pr-3"> {/* Added padding for scrollbar */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input type="email" placeholder="teacher@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input type="tel" placeholder="e.g. +1234567890" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input type="date" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="male" /></FormControl>
                                        <FormLabel className="font-normal">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="female" /></FormControl>
                                        <FormLabel className="font-normal">Female</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl><Textarea placeholder="Teacher's address" className="resize-none" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Password field only for create or if explicitly updating */}
                 <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                         <FormItem>
                             <FormLabel>{isUpdate ? "New Password (optional)" : "Password"} <span className="text-red-500">{!isUpdate && "*"}</span></FormLabel>
                             <FormControl><Input type="password" placeholder={isUpdate ? "Leave blank to keep current" : "Enter password"} {...field} /></FormControl>
                             <FormMessage />
                         </FormItem>
                     )}
                 />
                 {/* Add password_confirmation field if using it in schema */}

                <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdate ? "Update Teacher" : "Create Teacher"}
                </Button>
            </form>
        </Form>
    );
}