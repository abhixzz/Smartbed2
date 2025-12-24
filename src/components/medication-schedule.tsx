'use client';

import type { Medication } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash2, CheckCircle, Droplet, Utensils, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Reminder = Medication & {
    type: 'med' | 'food' | 'water';
};

const initialReminders: Reminder[] = [
    { id: 'm2', name: 'Lisinopril', dosage: '10mg', time: '08:00', administered: true, type: 'med' },
    { id: 'rem1', name: 'Lunch', dosage: '', time: '12:30', administered: false, type: 'food' },
    { id: 'm1', name: 'Paracetamol', dosage: '500mg', time: '14:00', administered: false, type: 'med' },
    { id: 'rem2', name: 'Water', dosage: '250ml', time: '15:00', administered: false, type: 'water' },
    { id: 'm3', name: 'Atorvastatin', dosage: '20mg', time: '20:00', administered: false, type: 'med' },
].sort((a, b) => a.time.localeCompare(b.time));


export function MedicationSchedule({ medications: initialMedications }: { medications: Medication[] }) {
    const [reminders, setReminders] = useState(initialReminders);

    const handleToggleAdministered = (id: string) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, administered: !r.administered } : r));
    };

    const handleDelete = (id: string) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

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
        {reminders.length > 0 ? (
            <div className="space-y-4">
            {reminders.map((item) => (
                <div key={item.id} className={cn('flex items-center gap-4 group', item.administered && 'opacity-60')}>
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-muted-foreground">
                    {icons[item.type]}
                </div>
                <div className="flex-1">
                    <p className={cn('font-semibold', item.administered && 'line-through')}>{item.name}</p>
                    {item.dosage && <p className={cn('text-sm text-muted-foreground', item.administered && 'line-through')}>{item.dosage}</p>}
                </div>
                <div className={cn('font-mono text-sm', item.administered ? 'text-muted-foreground line-through' : 'font-semibold')}>{item.time}</div>
                <Checkbox
                    id={`reminder-${item.id}`}
                    checked={item.administered}
                    onCheckedChange={() => handleToggleAdministered(item.id)}
                    className="h-5 w-5"
                    aria-label={`Mark ${item.name} as ${item.administered ? 'incomplete' : 'complete'}`}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No reminders scheduled.</p>
        )}
      </CardContent>
    </Card>
  );
}
