// src/pages/Register.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from 'lucide-react';
import { useUserContext } from '../../context/UserContext';
import { USER_LOGIN } from '../../router';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match.",
  path: ["password_confirmation"],
});

export default function Register() {
  const { register } = useUserContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", password_confirmation: "" },
  });
  const { setError, formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    try {
      await register(values);
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key, { type: 'server', message: error.response.data.errors[key][0] });
        });
      } else {
        setError("root", { message: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full p-8 space-y-8 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '} <Link to={USER_LOGIN} className="font-medium text-indigo-600 hover:text-indigo-500">login to your existing account</Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* --- FIX: The complete JSX for each FormField --- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input {...field} placeholder="John Doe" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl><Input {...field} placeholder="you@example.com" /></FormControl>
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
                  <FormControl><Input type="password" {...field} placeholder="********" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl><Input type="password" {...field} placeholder="********" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader className="animate-spin h-4 w-4 mr-2" />}
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}