// src/components/Auth/UserLogin.jsx
import { Link } from "react-router-dom";
import { USER_REGISTER, FORGOT_PASSWORD } from "../../router";

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "../../context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

export default function UserLogin() {
  const { login } = useUserContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "yassine@gmail.com", password: "12345678" },
  });

  const { setError, formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      // The AuthGuard and GuestLayout will handle all redirection.
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials or server error.';
      // Set the error on the root of the form to display a general message
      setError('root', {
        message: errorMessage,
      });
    }
  };

  return (
    // --- FIX: Added consistent layout wrapper for a centered card UI ---
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full p-8 space-y-8 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input {...field} placeholder="you@example.com" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" {...field} placeholder="********" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* --- FIX: Added Forgot Password link --- */}
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to={FORGOT_PASSWORD} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Display root-level errors from the server */}
            {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader className="animate-spin h-4 w-4 mr-2" />}
              Sign In
            </Button>
          </form>
        </Form>
        
        {/* --- FIX: Added Register link at the bottom --- */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Not a member?{' '}
          <Link to={USER_REGISTER} className="font-medium text-indigo-600 hover:text-indigo-500">
            Start your journey here
          </Link>
        </p>
      </div>
    </div>
  );
}