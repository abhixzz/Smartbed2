import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Clock } from 'lucide-react';

export function BedStatus({ bed }: { bed: Patient['bed'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bed Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <BedDouble className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Position</p>
            <p className="font-semibold">{bed.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Last Adjusted</p>
            <p className="font-semibold">{bed.lastAdjusted}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
