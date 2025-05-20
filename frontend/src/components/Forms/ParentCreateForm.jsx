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
import { ParentApi } from "../../Services/Api/Parent/Parent.js";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { toast } from "sonner";


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
        .min(1, "Phone is required")
        .regex(/^(\+212|0)([5-7]\d{8})$/, "Invalid phone number, we accept only Morocco phone numbers"),
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

    const { setError, formState: { isSubmitting }, reset } = form

    const onSubmit = async values => {
        console.log(values)
        await ParentApi.create(values)
            .then(({ status }) => {
                if (status === 201) {
                    // Use Sonner's toast function correctly
                    toast.success("Parent created successfully!");
                    reset();
                }
            })
            .catch((error) => {
                const { response } = error;
                if (response?.data?.errors) {
                    Object.entries(response.data.errors).forEach(([field, messages]) => {
                        setError(field, {
                            message: messages.join(', ')
                        });
                    });
                } else {
                    // Use Sonner's error toast
                    toast.error("Unexpected error occurred.");
                    console.error(error);
                }
            });
    }

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
                                <Input type="tel" placeholder="Phone" {...field} value={field.value ?? ""} />
                            </FormControl>
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
