'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc, useMemoFirebase } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: 'Display name must be at least 2 characters.',
  }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid, 'profile', 'main') : null),
    [firestore, user]
  );
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        displayName: userProfile.displayName || '',
        email: userProfile.email || user?.email || '',
      });
    } else if (user) {
        form.reset({
            displayName: user.displayName || '',
            email: user.email || '',
        });
    }
  }, [userProfile, user, form]);

  const onSubmit = (data: ProfileFormValues) => {
    if (!userProfileRef) return;
    setLoading(true);
    
    const profileData = {
        id: user?.uid,
        ...data,
        themePreference: userProfile?.themePreference || 'light'
    }

    setDocumentNonBlocking(userProfileRef, profileData, { merge: true });
    toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
      });
    setLoading(false);
  };
  
  if (isProfileLoading) {
    return <Loader2 className="h-6 w-6 animate-spin" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
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
                <Input placeholder="your@email.com" {...field} readOnly disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
