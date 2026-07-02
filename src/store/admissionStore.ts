import { create } from 'zustand';
import { Admission } from '../types/admission';

interface AdmissionStore {
  admissions: Admission[];

  addAdmission: (
    admission: Admission
  ) => void;

  dischargeAdmission: (
    admissionId: string
  ) => void;

  getActiveAdmission: (
    patientId: string
  ) => Admission | undefined;
}

export const useAdmissionStore =
  create<AdmissionStore>((set, get) => ({
admissions: [],
    addAdmission: (admission) =>
      set((state) => ({
        admissions: [
          ...state.admissions,
          admission,
        ],
      })),

    dischargeAdmission: (
      admissionId
    ) =>
      set((state) => ({
        admissions:
          state.admissions.map((a) =>
            a.id === admissionId
              ? {
                  ...a,
                  status: 'DISCHARGED',
                }
              : a
          ),
      })),

    getActiveAdmission: (
      patientId
    ) =>
      get().admissions.find(
        (a) =>
          a.patientId === patientId &&
          a.status === 'ACTIVE'
      ),
  }));