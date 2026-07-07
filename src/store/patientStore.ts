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
    console.error('Patient Store Error:', error);
    return;
  }

set({
  patients: data.map(
    (patient: any) => ({
      ...patient,

      doctorAssigned:
        patient.doctor_assigned,

      billingType:
        patient.billing_type,

      billingRemarks:
        patient.billing_remarks,

      chiefComplaint:
        patient.chief_complaint,

      clinicalHistory:
        patient.clinical_history,

      treatmentPlan:
        patient.treatment_plan,

      doctorNotes:
        patient.doctor_notes,

      caseSheetUpdatedAt:
        patient.case_sheet_updated_at,
    })
  ),
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
    name: updates.name,
    age: updates.age,
    gender: updates.gender,
    ward: updates.ward,
    diagnosis: updates.diagnosis,
    mobile: updates.mobile,

    doctor_assigned:
      updates.doctorAssigned,

    billing_type:
      updates.billingType,

    billing_remarks:
      updates.billingRemarks,

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
    console.error('Patient Store Error:', error);
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
