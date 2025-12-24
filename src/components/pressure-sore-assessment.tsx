'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { assessPressureSoreRisk, PressureSoreRiskAssessmentOutput } from '@/ai/flows/pressure-sore-risk-assessment';
import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Lightbulb, ShieldCheck, FileText } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { VariantProps } from 'class-variance-authority';

const formSchema = z.object({
  movementPatterns: z.string().min(10, "Please provide more detail about movement patterns."),
  bedStatus: z.string().min(5, "Please describe the bed status."),
});

type PressureSoreFormValues = z.infer<typeof formSchema>;

export function PressureSoreAssessment({ patient }: { patient: Patient }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PressureSoreRiskAssessmentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<PressureSoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movementPatterns: "Patient has been mostly immobile for the past 4 hours.",
      bedStatus: `Bed is in ${patient.bed.position} position.`,
    },
  });

  const onSubmit = async (data: PressureSoreFormValues) => {
    setLoading(true);
    setResult(null);
    try {
      const vitalSigns = patient.vitals.map(v => `${v.name}: ${v.value} ${v.unit}`).join(', ');
      const assessmentResult = await assessPressureSoreRisk({ ...data, vitalSigns });
      setResult(assessmentResult);
    } catch (error) {
      console.error("Error assessing pressure sore risk:", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "Could not get a risk assessment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getRiskBadgeVariant = (risk: string): VariantProps<typeof Badge>['variant'] => {
    switch(risk.toLowerCase()) {
        case 'high': return 'destructive';
        case 'medium': return 'default';
        case 'low': return 'secondary';
        default: return 'outline';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preventive Care: Pressure Sore Risk</CardTitle>
        <CardDescription>Use AI to assess the risk of pressure sores based on current data.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="movementPatterns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movement Patterns</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe patient's recent movement..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe bed position and status..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assess Risk
            </Button>
          </form>
        </Form>
        {result && (
          <Alert className="mt-6 border-primary/50">
            <Lightbulb className="h-4 w-4 text-primary" />
            <div className="flex items-center justify-between">
                <AlertTitle>AI Assessment Result</AlertTitle>
                <Badge variant={getRiskBadgeVariant(result.riskLevel)}>{result.riskLevel} Risk</Badge>
            </div>
            <AlertDescription className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div>
                    <h4 className="font-semibold">Reasoning</h4>
                    <p className="text-muted-foreground">{result.reasoning}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div>
                    <h4 className="font-semibold">Recommendations</h4>
                    <p className="text-muted-foreground">{result.recommendations}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
