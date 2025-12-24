import type { Medication } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Clock, Droplet, Utensils, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MedicationSchedule({ medications }: { medications: Medication[] }) {
  const allReminders = [
    ...medications.map(m => ({ ...m, type: 'med' as const })),
    { id: 'rem1', time: '12:30', name: 'Lunch', dosage: '', administered: false, type: 'food' as const },
    { id: 'rem2', time: '15:00', name: 'Water', dosage: '250ml', administered: false, type: 'water' as const },
  ].sort((a, b) => a.time.localeCompare(b.time));

  const icons = {
    med: <Pill />,
    food: <Utensils />,
    water: <Droplet />,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication & Reminders</CardTitle>
        <CardDescription>Today's schedule for all reminders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allReminders.map((item) => (
            <div key={item.id} className={cn('flex items-center gap-4', item.administered && 'opacity-50')}>
              <div className="flex-shrink-0">
                {item.administered
                  ? <CheckCircle className="h-6 w-6 text-foreground" />
                  : <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">{icons[item.type]}</div>
                }
              </div>
              <div className="flex-1">
                <p className={cn('font-semibold', item.administered && 'line-through')}>{item.name}</p>
                {item.dosage && <p className={cn('text-sm text-muted-foreground', item.administered && 'line-through')}>{item.dosage}</p>}
              </div>
              <div className={cn('font-mono text-sm', item.administered ? 'text-muted-foreground line-through' : 'font-semibold')}>{item.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
