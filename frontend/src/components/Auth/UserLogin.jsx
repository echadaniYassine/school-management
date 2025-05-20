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
import { useNavigate } from "react-router-dom";
import { ADMIN_DASHBOARD, PARENT_DASHBOARD, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../router";
import { useUserContext } from "../../context/StudentContext";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

export default function UserLogin() {
  const { login, setAuthenticated, setToken } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "yassine@gmail.com", password: "12345678" },
  });

  const { setError, formState: { isSubmitting } } = form;

  const onSubmit = async values => {
    await login(values.email, values.password).then(
      ({ status, data }) => {
        if (status === 200) {
          setToken(data.token)
          setAuthenticated(true)
          const { role } = data.user
          switch (role) {
            case 'student':
              navigate(STUDENT_DASHBOARD);
              break;
            case 'admin':
              navigate(ADMIN_DASHBOARD)
              break;
            case 'teacher':
              navigate(TEACHER_DASHBOARD)
              break;
            case 'parent':
              navigate(PARENT_DASHBOARD)
              break;
          }
        }
      }).catch((error) => {
        const errorMessages = error?.response?.data?.errors?.email;
        setError('email', {
          message: errorMessages?.join() || 'An unexpected error occurred.',
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto my-12">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
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

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader className="animate-spin h-4 w-4 mr-2" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
