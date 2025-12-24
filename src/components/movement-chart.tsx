"use client"

import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  activity: {
    label: "Activity",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function MovementChart({ data }: { data: Patient['movementData'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Movement & Sleep Patterns</CardTitle>
        <CardDescription>Hourly patient activity levels.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="activity" fill="var(--color-activity)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
