import { create } from 'zustand';
import { supabase } from '../lib/supabase';
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  ward: string;
  mobile?: string;
doctorAssigned?: string;
diagnosis?: string;
billingType?: string;
billingRemarks?: string;
chiefComplaint?: string;
clinicalHistory?: string;
treatmentPlan?: string;
doctorNotes?: string;
caseSheetUpdatedAt?: string;
}

interface PatientStore {
  patients: Patient[];
setPatients: (
  patients: Patient[]
) => void;

loadPatients: () => Promise<void>;
  addPatient: (
    patient: Patient
  ) => void;

  updatePatient: (
    id: string,
    updates: Partial<Patient>
  ) => void;

  dischargePatient: (
    id: string
  ) => void;
}

export const usePatientStore =
  create<PatientStore>((set) => ({
    patients: [
      {
        id: 'PAT001',
        name: 'Ravi Kumar',
        age: 40,
        gender: 'Male',
        ward: 'General Ward - 2 / 205',
        diagnosis: 'Chest Pain',
      },
      {
        id: 'PAT002',
        name: 'Lakshmi Devi',
        age: 52,
        gender: 'Female',
        ward: 'General Ward - 1 / 103',
        diagnosis: 'Fever',
      },
      {
        id: 'PAT003',
        name: 'Ramesh Babu',
        age: 61,
        gender: 'Male',
        ward: 'General Ward - 1 / 104',
        diagnosis: 'Post Operative Care',
      },
    ],
setPatients: (patients) =>
  set({
    patients,
  }),

loadPatients: async () => {
  const { data, error } =
    await supabase
      .from('patients')
      .select('*');

  if (error) {
    console.log(error);
    return;
  }

  set({
    patients:
      data as Patient[],
  });
},

    addPatient: (patient) =>
      set((state) => ({
        patients: [
          ...state.patients,
          patient,
        ],
      })),

    updatePatient: (
      id,
      updates
    ) =>
      set((state) => ({
        patients: state.patients.map(
          (patient) =>
            patient.id === id
              ? {
                  ...patient,
                  ...updates,
                }
              : patient
        ),
      })),

    dischargePatient: (id) =>
      set((state) => ({
        patients:
          state.patients.filter(
            (patient) =>
              patient.id !== id
          ),
      })),
  }));
