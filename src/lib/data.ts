import type { Patient } from './types';

export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'JD',
    room: '301A',
    status: 'Needs Attention',
    vitals: [
      { name: 'Blood Pressure', value: '130/85', unit: 'mmHg', status: 'Warning' },
      { name: 'Pulse', value: '95', unit: 'bpm', status: 'Warning' },
      { name: 'Temperature', value: '37.8', unit: '°C', status: 'Normal' },
      { name: 'SpO2', value: '96', unit: '%', status: 'Normal' },
      { name: 'Respiratory Rate', value: '22', unit: 'br/min', status: 'Warning' },
    ],
    alerts: [
      { id: 'a1', priority: 'High', title: 'High Heart Rate', description: 'Patient heart rate exceeds threshold.', timestamp: '2 min ago' },
      { id: 'a2', priority: 'Medium', title: 'Medication Due', description: 'Paracetamol 500mg due now.', timestamp: '10 min ago' },
    ],
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', time: '14:00', administered: false },
      { id: 'm2', name: 'Lisinopril', dosage: '10mg', time: '08:00', administered: true },
      { id: 'm3', name: 'Atorvastatin', dosage: '20mg', time: '20:00', administered: false },
    ],
    bed: { position: 'Upright, 30°', lastAdjusted: '13:45' },
    movementData: [
      { time: '08:00', activity: 20 },
      { time: '09:00', activity: 30 },
      { time: '10:00', activity: 10 },
      { time: '11:00', activity: 5 },
      { time: '12:00', activity: 40 },
      { time: '13:00', activity: 15 },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'JS',
    room: '302B',
    status: 'Stable',
    vitals: [
      { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal' },
      { name: 'Pulse', value: '72', unit: 'bpm', status: 'Normal' },
      { name: 'Temperature', value: '36.6', unit: '°C', status: 'Normal' },
      { name: 'SpO2', value: '98', unit: '%', status: 'Normal' },
      { name: 'Respiratory Rate', value: '16', unit: 'br/min', status: 'Normal' },
    ],
    alerts: [],
    medications: [
      { id: 'm1', name: 'Ibuprofen', dosage: '200mg', time: '12:00', administered: true },
    ],
    bed: { position: 'Flat', lastAdjusted: '11:30' },
    movementData: [
      { time: '08:00', activity: 50 },
      { time: '09:00', activity: 60 },
      { time: '10:00', activity: 45 },
      { time: '11:00', activity: 55 },
      { time: '12:00', activity: 70 },
      { time: '13:00', activity: 65 },
    ],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    avatar: 'RJ',
    room: '305A',
    status: 'Critical',
    vitals: [
      { name: 'Blood Pressure', value: '90/60', unit: 'mmHg', status: 'Critical' },
      { name: 'Pulse', value: '120', unit: 'bpm', status: 'Critical' },
      { name: 'Temperature', value: '38.5', unit: '°C', status: 'Warning' },
      { name: 'SpO2', value: '92', unit: '%', status: 'Critical' },
      { name: 'Respiratory Rate', value: '28', unit: 'br/min', status: 'Critical' },
    ],
    alerts: [
      { id: 'a1', priority: 'Emergency', title: 'Fall Detected', description: 'Immediate assistance required.', timestamp: 'Just now' },
      { id: 'a2', priority: 'Critical', title: 'Low SpO2', description: 'Oxygen saturation is critically low.', timestamp: '1 min ago' },
    ],
    medications: [],
    bed: { position: 'Trendelenburg', lastAdjusted: '14:02' },
    movementData: [
      { time: '08:00', activity: 5 },
      { time: '09:00', activity: 2 },
      { time: '10:00', activity: 4 },
      { time: '11:00', activity: 1 },
      { time: '12:00', activity: 5 },
      { time: '13:00', activity: 3 },
    ],
  },
];

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};
