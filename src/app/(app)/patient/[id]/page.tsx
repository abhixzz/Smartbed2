import { getPatientById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { VitalSigns } from '@/components/vital-signs';
import { MovementChart } from '@/components/movement-chart';
import { MedicationSchedule } from '@/components/medication-schedule';
import { Alerts } from '@/components/alerts';
import { BedStatus } from '@/components/bed-status';
import { PressureSoreAssessment } from '@/components/pressure-sore-assessment';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { BedDouble } from 'lucide-react';

type PatientPageProps = {
  params: { id: string };
};

export default function PatientPage({ params }: PatientPageProps) {
  const patient = getPatientById(params.id);

  if (!patient) {
    notFound();
  }
  
  const statusVariant: VariantProps<typeof Badge>['variant'] =
    patient.status === 'Critical'
      ? 'destructive'
      : patient.status === 'Needs Attention'
      ? 'default'
      : 'secondary';

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Avatar className="h-20 w-20 border">
                <AvatarFallback className="text-3xl bg-background">
                {patient.avatar}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h1 className="text-3xl font-bold">{patient.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4" />
                        <span>Room {patient.room}</span>
                    </div>
                    <Badge variant={statusVariant} className="capitalize">{patient.status}</Badge>
                </div>
            </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <VitalSigns vitals={patient.vitals} />
            <MovementChart data={patient.movementData} />
            <PressureSoreAssessment patient={patient} />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Alerts alerts={patient.alerts} />
            <BedStatus bed={patient.bed} />
            <MedicationSchedule medications={patient.medications} />
        </div>
        </div>
    </div>
  );
}
