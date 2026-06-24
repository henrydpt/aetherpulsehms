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
) => Promise<void>;

  dischargePatient: (
    id: string
  ) => void;
}

export const usePatientStore =
  create<PatientStore>((set) => ({
patients: [],
setPatients: (patients) =>
  set({
    patients,
  }),

loadPatients: async () => {
const { data, error } =
  await supabase
    .from('patients')
    .select('*')
    .eq('active', true);

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

updatePatient: async (
  id,
  updates
) => {
  const { error } =
    await supabase
      .from('patients')
      .update({
        chief_complaint:
          updates.chiefComplaint,
        clinical_history:
          updates.clinicalHistory,
        treatment_plan:
          updates.treatmentPlan,
        doctor_notes:
          updates.doctorNotes,
        case_sheet_updated_at:
          updates.caseSheetUpdatedAt,
      })
      .eq('id', id);

  if (error) {
    console.log(error);
    return;
  }

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
  }));
},

    dischargePatient: (id) =>
      set((state) => ({
        patients:
          state.patients.filter(
            (patient) =>
              patient.id !== id
          ),
      })),
  }));
