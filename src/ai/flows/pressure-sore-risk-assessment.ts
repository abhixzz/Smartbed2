'use server';
/**
 * @fileOverview Assesses the risk of pressure sores for a patient using GenAI.
 *
 * - assessPressureSoreRisk - A function that assesses the risk of pressure sores for a patient.
 * - PressureSoreRiskAssessmentInput - The input type for the assessPressureSoreRisk function.
 * - PressureSoreRiskAssessmentOutput - The return type for the assessPressureSoreRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PressureSoreRiskAssessmentInputSchema = z.object({
  vitalSigns: z.string().describe('Real-time vital signs (BP, pulse, temperature, SpO₂, respiratory rate).'),
  movementPatterns: z.string().describe('Description of patient movement patterns.'),
  bedStatus: z.string().describe('Bed position and adjustment status.'),
});
export type PressureSoreRiskAssessmentInput = z.infer<typeof PressureSoreRiskAssessmentInputSchema>;

const PressureSoreRiskAssessmentOutputSchema = z.object({
  riskLevel: z.string().describe('The risk level of pressure sores (High, Medium, Low).'),
  reasoning: z.string().describe('The reasoning behind the risk assessment.'),
  recommendations: z.string().describe('Preventive measures recommended based on the risk assessment.'),
});
export type PressureSoreRiskAssessmentOutput = z.infer<typeof PressureSoreRiskAssessmentOutputSchema>;

export async function assessPressureSoreRisk(input: PressureSoreRiskAssessmentInput): Promise<PressureSoreRiskAssessmentOutput> {
  return assessPressureSoreRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pressureSoreRiskAssessmentPrompt',
  input: {schema: PressureSoreRiskAssessmentInputSchema},
  output: {schema: PressureSoreRiskAssessmentOutputSchema},
  prompt: `You are an expert healthcare assistant specializing in pressure sore risk assessment. Based on the patient's vital signs, movement patterns, and bed status, determine the risk level of pressure sores (High, Medium, Low), provide reasoning for the assessment, and recommend preventive measures.

Vital Signs: {{{vitalSigns}}}
Movement Patterns: {{{movementPatterns}}}
Bed Status: {{{bedStatus}}}`,
});

const assessPressureSoreRiskFlow = ai.defineFlow(
  {
    name: 'assessPressureSoreRiskFlow',
    inputSchema: PressureSoreRiskAssessmentInputSchema,
    outputSchema: PressureSoreRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
