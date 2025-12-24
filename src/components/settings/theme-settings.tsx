'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function ThemeSettings() {
    // In a real app, you'd use a theme provider like next-themes
    const setTheme = (theme: string) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Select your preferred color scheme.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="light" onValueChange={setTheme}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="r1" />
            <Label htmlFor="r1">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="r2" />
            <Label htmlFor="r2">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="r3" disabled />
            <Label htmlFor="r3">System (coming soon)</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
