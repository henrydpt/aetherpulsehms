export interface Admission {
  id: string;
  patientId: string;

  admissionNumber: string;

  admissionDate: string;

  ward: string;

  bedNumber?: string;

  doctorAssigned?: string;

  diagnosis?: string;

  billingType?: string;

  billingRemarks?: string;

  status: 'ACTIVE' | 'DISCHARGED';
}