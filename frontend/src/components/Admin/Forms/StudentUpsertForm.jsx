import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
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
    name: z.string().max(50, "Name is too long"),
    date_of_birth: z.string().nonempty("Date of birth is required"),
    gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Gender is required" }),
    }),
    address: z.string().max(255, "Address is too long"),
    phone: z
        .string()
        .regex(
            /^(?:\+212|0)(5|6|7)\d{8}$/,
            "Invalid Moroccan phone number"
        ),
    email: z.string().email("Invalid email").min(2).max(30),
});

const createSchema = baseSchema.extend({
    password: z.string().min(8, "Minimum 8 characters").max(30),
});

const updateSchema = baseSchema.extend({
    password: z.string().optional(),
});

export default function StudentUpsertForm({ handleSubmit, values, onSuccess }) {
    const isUpdate = values !== undefined;

    const form = useForm({
        resolver: zodResolver(isUpdate ? updateSchema : createSchema),
        defaultValues: values || {},
    });

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;

    const onSubmit = async (formValues) => {
        const loaderMsg = isUpdate ? "Updating in progress..." : "Adding Student...";
        const loader = toast.loading(loaderMsg);

        if (isUpdate && !formValues.password) {
            delete formValues.password;
        }

        try {
            const { status, data } = await handleSubmit(formValues);
            if (status === 200) {
                toast.success(data.message);
                reset();
                if (onSuccess) onSuccess(); // ⬅️ Trigger tab switch
            }
        } catch (error) {
            const response = error.response;
            if (response?.data?.errors) {
                Object.entries(response.data.errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { message: errorMessages.join(", ") });
                });
            } else {
                toast.error("An unexpected error occurred.");
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
                                <Input placeholder="Full name" {...field} />
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
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
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
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!isUpdate && (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="mt-2">
                    {isSubmitting && <Loader className="mx-2 animate-spin" />}
                    {isUpdate ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    );
}
