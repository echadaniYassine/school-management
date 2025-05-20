import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import ParentApi from "../../../Services/Api/Parent/Parent.js";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select.js";
import { Textarea } from "../../ui/textarea.js";
import { toast } from "sonner";

// Updated phone normalization function
const normalizePhone = (phone) => {
    // If it starts with 0, replace with +212
    if (phone.startsWith("0") && phone.length === 10) {
        return "+212" + phone.slice(1);
    }
    
    // If it's already in international format, keep as is
    if (phone.startsWith("+212") && phone.length === 13) {
        return phone;
    }
    
    // Return as-is for other cases (the validation will catch invalid formats)
    return phone;
};

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    date_of_birth: z.string()
        .min(1, "Date of birth is required")
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date"
        }),
    gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Gender is required" }) }),
    address: z.string().min(1, "Address is required").max(255),
    phone: z.string()
        .regex(
            /^(0[5-7]\d{8}|\+212[5-7]\d{8})$/,
            "Invalid phone number. Must be 10 digits starting with 0 or 13 digits starting with +212"
        )
        .refine((val) => {
            return (
                (val.startsWith("0") && val.length === 10) ||
                (val.startsWith("+212") && val.length === 13)
            );
        }, {
            message: "Phone number length is invalid for the given format",
        }),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .max(60),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must not exceed 30 characters")
});

export default function ParentCreateForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            date_of_birth: '',
            gender: '',
            address: '',
            phone: '',
            email: 'parent@gmail.com',
            password: '12345678'
        }
    });

    const { setError, formState: { isSubmitting }, reset } = form;

    const onSubmit = async values => {
        try {
            // Normalize the phone number to the international format (+212XXXXXXXXX)
            const payload = {
                ...values,
                phone: normalizePhone(values.phone),
            };
            
            console.log("Submitting with payload:", payload);
            
            const response = await ParentApi.create(payload);
            
            if (response.status === 201) {
                toast.success("Parent created successfully!");
                reset();
            }
        } catch (error) {
            const { response } = error;
            if (response?.data?.errors) {
                Object.entries(response.data.errors).forEach(([field, messages]) => {
                    // Special handling for phone errors
                    if (field === "phone" && messages.some(msg => msg.includes("greater than"))) {
                        toast.error("There's an issue with the phone validation on the server");
                        console.error("Server expected 10 characters but received 13. Check your API validation rules.");
                        setError(field, {
                            message: "Server validation error: The phone number format conflicts with server requirements"
                        });
                    } else {
                        setError(field, {
                            message: messages.join(', ')
                        });
                    }
                });
            } else {
                toast.error("Unexpected error occurred.");
                console.error("API Error:", error);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <Input type={'date'} placeholder="Date of birth" {...field} value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value ?? ""}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Female
                                        </FormLabel>
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
                            <FormControl>
                                <Textarea
                                    placeholder="Address"
                                    className="resize-none"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input 
                                    type="tel" 
                                    placeholder="Phone (0XXXXXXXXX or +212XXXXXXXXX)" 
                                    {...field} 
                                    value={field.value ?? ""} 
                                />
                            </FormControl>
                            <p className="text-sm text-gray-500 mt-1">
                                Format: 0XXXXXXXXX or +212XXXXXXXXX (both will be stored in international format)
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={'password'} placeholder="Password" {...field} value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className={''} type="submit">
                    {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'} />} {' '} Create
                </Button>
            </form>
        </Form>
    );
}