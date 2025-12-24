import type { VitalSign } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Thermometer, Wind, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { BPIcon } from '@/components/icons';

const iconMap: Record<string, ReactNode> = {
  'Blood Pressure': <BPIcon className="h-6 w-6 text-muted-foreground" />,
  'Pulse': <HeartPulse className="h-6 w-6 text-muted-foreground" />,
  'Temperature': <Thermometer className="h-6 w-6 text-muted-foreground" />,
  'SpO2': <Droplets className="h-6 w-6 text-muted-foreground" />,
  'Respiratory Rate': <Wind className="h-6 w-6 text-muted-foreground" />,
};

export function VitalSigns({ vitals }: { vitals: VitalSign[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vitals.map((vital) => {
          const statusColorClass =
            vital.status === 'Critical' ? 'text-destructive' :
            vital.status === 'Warning' ? 'text-primary' :
            'text-foreground';

          return (
            <div key={vital.name} className="flex flex-col items-center justify-center p-4 bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg text-center shadow-inner">
              {iconMap[vital.name]}
              <p className="text-xs text-muted-foreground mt-2">{vital.name}</p>
              <p className={cn('text-2xl font-bold mt-1', statusColorClass)}>
                {vital.value}
              </p>
              <p className="text-sm text-muted-foreground">{vital.unit}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
