// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from 'lucide-react';
import { UserApi } from '@/Services/Api/UserApi';
import { USER_LOGIN } from '@/router';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });
  const { setError, formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    setMessage('');
    try {
      const response = await UserApi.forgotPassword(values.email);
      // For security, show a generic success message
      setMessage(response.data.message || "If an account with that email exists, a password reset link has been sent.");
    } catch (error) {
      setError("email", { message: error.response?.data?.message || "Failed to send reset link. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full p-8 space-y-8 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reset Your Password</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                No problem! Enter your email and we'll send you a link.
            </p>
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
            
            {message && <p className="text-sm font-medium text-green-600 dark:text-green-500">{message}</p>}
            
            <Button type="submit" disabled={isSubmitting || !!message} className="w-full">
              {isSubmitting && <Loader className="animate-spin h-4 w-4 mr-2" />}
              Send Reset Link
            </Button>
          </form>
        </Form>
        <div className="text-center">
            <Link to={USER_LOGIN} className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                Back to Login
            </Link>
        </div>
      </div>
    </div>
  );
}