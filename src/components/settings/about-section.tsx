'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AboutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About MediVue</CardTitle>
        <CardDescription>Information about the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>MediVue - Modern Patient Monitoring</p>
        <p className="text-sm text-muted-foreground">Version 1.0.0</p>
      </CardContent>
    </Card>
  );
}
