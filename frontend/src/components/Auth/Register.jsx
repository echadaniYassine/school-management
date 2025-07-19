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
import { motion } from 'framer-motion';

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
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Your Account</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Join us to begin your journey.</p>
            </div>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                    <FormLabel className="dark:text-gray-300">Full Name</FormLabel>
                    <FormControl><Input {...field} placeholder="John Doe" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                    <FormLabel className="dark:text-gray-300">Email Address</FormLabel>
                    <FormControl><Input {...field} placeholder="you@example.com" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                    <FormLabel className="dark:text-gray-300">Password</FormLabel>
                    <FormControl><Input type="password" {...field} placeholder="********" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="password_confirmation" render={({ field }) => (
                    <FormItem>
                    <FormLabel className="dark:text-gray-300">Confirm Password</FormLabel>
                    <FormControl><Input type="password" {...field} placeholder="********" className="bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
                
                {form.formState.errors.root && <FormMessage className="text-red-500 dark:text-red-400 font-semibold">{form.formState.errors.root.message}</FormMessage>}
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-6">
                    {isSubmitting && <Loader className="animate-spin h-5 w-5 mr-2" />}
                    Create Account
                    </Button>
                </motion.div>
            </form>
            </Form>
            
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to={USER_LOGIN} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Sign in here
                </Link>
            </p>
        </motion.div>
    </div>
  );
}