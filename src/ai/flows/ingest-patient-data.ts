'use server';
/**
 * @fileOverview Ingests patient data from an external source like an ESP32.
 *
 * - ingestPatientData - A function that receives and stores patient data in Firestore.
 * - IngestDataInput - The input type for the ingestPatientData function.
 * - IngestDataOutput - The return type for the ingestPatientData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Schemas for data chunks
const VitalSignSchema = z.object({
    bloodPressure: z.string(),
    pulse: z.number(),
    temperature: z.number(),
    spo2: z.number(),
    respiratoryRate: z.number(),
});

const MovementPatternSchema = z.object({
    movementData: z.string(),
    sleepData: z.string(),
});

const BedStatusSchema = z.object({
    position: z.string(),
    adjustmentStatus: z.string(),
});

// Main input schema for the flow
const IngestDataInputSchema = z.object({
  patientId: z.string().describe('The unique ID of the patient.'),
  vitalSigns: VitalSignSchema.optional(),
  movementPattern: MovementPatternSchema.optional(),
  bedStatus: BedStatusSchema.optional(),
});
export type IngestDataInput = z.infer<typeof IngestDataInputSchema>;

const IngestDataOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  docIds: z.record(z.string()).optional(),
});
export type IngestDataOutput = z.infer<typeof IngestDataOutputSchema>;

// Initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
       initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
       });
    } else {
        // For local development without service account
        initializeApp();
    }
  }
  return getFirestore();
}


export async function ingestPatientData(input: IngestDataInput): Promise<IngestDataOutput> {
  return ingestPatientDataFlow(input);
}


const ingestPatientDataFlow = ai.defineFlow(
  {
    name: 'ingestPatientDataFlow',
    inputSchema: IngestDataInputSchema,
    outputSchema: IngestDataOutputSchema,
  },
  async (input) => {
    const firestore = initializeFirebaseAdmin();
    const { patientId, vitalSigns, movementPattern, bedStatus } = input;
    const docIds: Record<string, string> = {};

    try {
      if (vitalSigns) {
        const vitalSignsRef = firestore.collection(`patients/${patientId}/vitalSigns`);
        const docRef = await vitalSignsRef.add({
          ...vitalSigns,
          patientId,
          timestamp: new Date(),
        });
        docIds.vitalSign = docRef.id;
      }

      if (movementPattern) {
        const movementPatternsRef = firestore.collection(`patients/${patientId}/movementPatterns`);
        const docRef = await movementPatternsRef.add({
          ...movementPattern,
          patientId,
          timestamp: new Date(),
        });
        docIds.movementPattern = docRef.id;
      }

      if (bedStatus) {
        const bedStatusesRef = firestore.collection(`patients/${patientId}/bedStatuses`);
        const docRef = await bedStatusesRef.add({
          ...bedStatus,
          patientId,
          timestamp: new Date(),
        });
        docIds.bedStatus = docRef.id;
      }
      
      if (Object.keys(docIds).length === 0) {
        return {
          success: false,
          message: 'No data provided to ingest.',
        };
      }

      return {
        success: true,
        message: 'Data ingested successfully.',
        docIds,
      };

    } catch (error: any) {
      console.error("Error ingesting patient data:", error);
      return {
        success: false,
        message: `Failed to ingest data: ${error.message}`,
      };
    }
  }
);
