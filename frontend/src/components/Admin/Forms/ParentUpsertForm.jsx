import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "../../ui/form.jsx";
import { Input } from "../../ui/input.jsx";
import { Button } from "../../ui/button.jsx";
import { Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.jsx";
import { Textarea } from "../../ui/textarea.jsx";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    date_of_birth: z.string()
        .min(1, "Date of birth is required")
        .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Gender is required" }) }),
    address: z.string().min(1, "Address is required").max(255),
    phone: z.string()
        .regex(
            /^(0[5-7]\d{8}|\+212[5-7]\d{8})$/,
            "Invalid phone number. Must be 10 digits starting with 0 or 13 digits starting with +212"
        )
        .refine(val =>
            (val.startsWith("0") && val.length === 10) ||
            (val.startsWith("+212") && val.length === 13),
            { message: "Phone number length is invalid for the given format" }
        ),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .max(60),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must not exceed 30 characters")
});

export default function ParentUpsertForm({ handleSubmit, values }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: "",
            date_of_birth: "",
            gender: "male",
            address: "",
            phone: "",
            email: "",
            password: ""
        }
    });

    const { setError, formState: { isSubmitting }, reset } = form;
    const isUpdate = values !== undefined;

    const onSubmit = async (values) => {
        const loaderMsg = isUpdate ? 'Updating in progress.' : 'Adding parent...';
        const loader = toast.loading(loaderMsg);

        try {
            const { status, data } = await handleSubmit(values);

            if (status === 200) {
                toast.success(data.message);
                reset();
            } else {
                toast.error("Operation failed. Please check your input.");
            }
        } catch (error) {
            const response = error?.response;

            if (response?.data?.errors) {
                Object.entries(response.data.errors).forEach(([field, messages]) => {
                    const errorMessage = messages.join(', ');

                    if (field === "phone" && messages.some(msg => msg.toLowerCase().includes("greater than"))) {
                        toast.error("Invalid phone number length. Please check the format.");
                        console.error("Phone validation error: Expected 10 characters, got a different format.");
                        setError(field, {
                            message: "The phone number must contain 10 digits or match +212 format."
                        });
                    } else {
                        setError(field, { message: errorMessage });
                    }
                });
            } else {
                toast.error("Unexpected error occurred. Please try again.");
                console.error("Unhandled API Error:", error);
            }
        } finally {
            toast.dismiss(loader);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
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
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
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
                                    value={field.value}
                                    className="flex space-x-4"
                                >
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
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
                            <FormControl>
                                <Textarea placeholder="Your Address" className="resize-none" {...field} />
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
                                <Input type="tel" placeholder="e.g. 0612345678 or +212612345678" {...field} />
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
                                <Input type="email" placeholder="example@mail.com" {...field} />
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
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="mt-4 w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdate ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    );
}
