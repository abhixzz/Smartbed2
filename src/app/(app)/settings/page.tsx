'use client';

import { useUser } from '@/firebase';
import { LoginForm } from '@/components/settings/login-form';
import { ProfileForm } from '@/components/settings/profile-form';
import { ThemeSettings } from '@/components/settings/theme-settings';
import { HelpSection } from '@/components/settings/help-section';
import { AboutSection } from '@/components/settings/about-section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isUserLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? <LoginForm /> : (
            <div className='space-y-4'>
              <p>Welcome, {user.email || 'User'}. You are logged in.</p>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
      )}

      <ThemeSettings />
      <HelpSection />
      <AboutSection />
    </div>
  );
}
