// src/pages/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  password: z.string().min(8, "Password must be at least 8 characters."),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match.",
  path: ["password_confirmation"],
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setErrorState] = useState('');
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });
  const { setError, formState: { isSubmitting } } = form;

  // Check for required URL parameters on component load
  useEffect(() => {
    if (!searchParams.get('token') || !searchParams.get('email')) {
      setErrorState("Invalid password reset link. Please request a new one.");
    }
  }, [searchParams]);

  const onSubmit = async (values) => {
    setMessage('');
    setErrorState('');

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) return;

    const payload = { ...values, token, email };

    try {
      const response = await UserApi.resetPassword(payload);
      setMessage(response.data.message || "Password reset successfully! Redirecting...");
      setTimeout(() => navigate(USER_LOGIN), 3000);
    } catch (err) {
       setErrorState(err.response?.data?.message || "Failed to reset password. The link may have expired.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full p-8 space-y-8 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Set a New Password</h2>
        </div>
        
        {error ? (
          <p className="text-center text-sm font-medium text-red-600">{error}</p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password_confirmation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {message && <p className="text-sm font-medium text-green-600">{message}</p>}
              
              <Button type="submit" disabled={isSubmitting || !!message} className="w-full">
                {isSubmitting && <Loader className="animate-spin h-4 w-4 mr-2" />}
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}