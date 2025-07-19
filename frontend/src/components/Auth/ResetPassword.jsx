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
import { motion } from 'framer-motion';

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
    <div className="relative flex items-center justify-center min-h-screen bg-white dark:bg-[#1a0f2e] px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-purple-500/30 to-pink-500/20 rounded-full filter blur-3xl opacity-50 dark:opacity-60 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative max-w-md w-full p-8 space-y-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm border dark:border-gray-700/50 rounded-2xl shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-2">
            EduGate
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Set a New Password</h2>
        </div>

        {error ? (
          <div className='text-center space-y-6'>
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{error}</p>
            <Link to="/forgot-password">
              <Button variant="outline" className="w-full">Request a New Link</Button>
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">New Password</FormLabel>
                  <FormControl><Input type="password" {...field} placeholder="********" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password_confirmation" render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Confirm New Password</FormLabel>
                  <FormControl><Input type="password" {...field} placeholder="********" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {message && <p className="text-sm font-medium text-green-600 dark:text-green-400">{message}</p>}

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" disabled={isSubmitting || !!message} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-6">
                  {isSubmitting && <Loader className="animate-spin h-5 w-5 mr-2" />}
                  Set New Password
                </Button>
              </motion.div>
            </form>
          </Form>
        )}
      </motion.div>
    </div>
  );
}