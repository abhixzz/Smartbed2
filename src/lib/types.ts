export type VitalSign = {
  name: 'Blood Pressure' | 'Pulse' | 'Temperature' | 'SpO2' | 'Respiratory Rate';
  value: string;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical';
};

export type Alert = {
  id: string;
  priority: 'Emergency' | 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  timestamp: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  time: string;
  administered: boolean;
};

export type Patient = {
  id: string;
  name: string;
  avatar: string;
  room: string;
  status: 'Stable' | 'Needs Attention' | 'Critical';
  vitals: VitalSign[];
  alerts: Alert[];
  medications: Medication[];
  bed: {
    position: string;
    lastAdjusted: string;
  };
  movementData: { time: string; activity: number }[];
};
