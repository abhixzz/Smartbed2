'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function HelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Support</CardTitle>
        <CardDescription>Find answers to common questions or get in touch.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline">FAQ</Button>
        <Button variant="outline">Contact Support</Button>
      </CardContent>
    </Card>
  );
}
