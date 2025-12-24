import type { Alert as AlertType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TriangleAlert, Bell, Siren } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { ReactElement } from 'react';
import React from 'react';

const priorityMap: Record<AlertType['priority'], {
  icon: ReactElement,
  variant: VariantProps<typeof Badge>['variant'],
  iconBgClass: string,
  iconClass: string
}> = {
  Emergency: { icon: <Siren className="h-4 w-4" />, variant: 'destructive', iconBgClass: 'bg-destructive', iconClass: 'text-destructive-foreground' },
  High: { icon: <TriangleAlert className="h-4 w-4" />, variant: 'destructive', iconBgClass: 'bg-destructive/20', iconClass: 'text-destructive' },
  Medium: { icon: <AlertCircle className="h-4 w-4" />, variant: 'default', iconBgClass: 'bg-primary/20', iconClass: 'text-primary' },
  Low: { icon: <Bell className="h-4 w-4" />, variant: 'secondary', iconBgClass: 'bg-secondary', iconClass: 'text-secondary-foreground' },
};

export function Alerts({ alerts }: { alerts: AlertType[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No active alerts.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const priorityInfo = priorityMap[alert.priority];
              return (
                <div key={alert.id} className="flex items-start gap-4">
                  <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', priorityInfo.iconBgClass)}>
                    {React.cloneElement(priorityInfo.icon, { className: cn('h-4 w-4', priorityInfo.iconClass) })}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <p className="font-semibold">{alert.title}</p>
                       <Badge variant={priorityInfo.variant}>{alert.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
