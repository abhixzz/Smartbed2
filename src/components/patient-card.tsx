import Link from 'next/link';
import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { BedDouble, AlertCircle, HeartPulse } from 'lucide-react';

type PatientCardProps = {
  patient: Patient;
};

export function PatientCard({ patient }: PatientCardProps) {

  const statusVariant: VariantProps<typeof Badge>['variant'] =
    patient.status === 'Critical'
      ? 'destructive'
      : patient.status === 'Needs Attention'
      ? 'default'
      : 'secondary';

  return (
    <Link href={`/patient/${patient.id}`} className="block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{patient.name}</CardTitle>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/20 text-primary font-bold">
              {patient.avatar}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              <span>Room {patient.room}</span>
            </div>
            <Badge variant={statusVariant} className="capitalize">
              {patient.status}
            </Badge>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <HeartPulse className="h-4 w-4 text-red-500" />
              <span>{patient.vitals.find(v => v.name === 'Pulse')?.value} bpm</span>
            </div>
            {patient.alerts.length > 0 && (
              <div className="flex items-center gap-1 text-yellow-600">
                <AlertCircle className="h-4 w-4" />
                <span>{patient.alerts.length} alerts</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
