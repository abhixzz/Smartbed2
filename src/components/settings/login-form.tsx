'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters."}),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: ''},
  })

  const onLoginSubmit = (data: LoginValues) => {
    setLoading(true);
    initiateEmailSignIn(auth, data.email, data.password)
      .then(() => {
        toast({ title: "Login successful!", description: "Welcome back." });
      })
      .catch((error) => {
        let description = "An unknown error occurred.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            description = "Invalid email or password. Please try again.";
        }
        toast({
          variant: "destructive",
          title: "Login Failed",
          description,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRegisterSubmit = (data: RegisterValues) => {
    setLoading(true);
    initiateEmailSignUp(auth, data.email, data.password)
      .then(() => {
        toast({ title: "Registration successful!", description: "You are now logged in." });
      })
      .catch((error) => {
        let description = "An unknown error occurred.";
        if (error.code === 'auth/email-already-in-use') {
            description = "This email is already registered. Please log in.";
        }
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 mt-4">
                <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
                </Button>
            </form>
            </Form>
        </TabsContent>
        <TabsContent value="register">
            <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 mt-4">
                <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Register
                </Button>
            </form>
            </Form>
        </TabsContent>
    </Tabs>
  );
}
