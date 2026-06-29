import { supabase } from '../lib/supabase';

export interface CreateAdmissionRequest {
  patientId: string;
  doctorAssigned?: string;
  diagnosis?: string;
  billingType?: string;
  billingRemarks?: string;
}

export async function createAdmission(
  request: CreateAdmissionRequest
) {
const existing =
  await supabase
    .from('admissions')
    .select('*')
    .eq(
      'patient_id',
      request.patientId
    )
    .eq('status', 'ACTIVE')
    .maybeSingle();

if (existing.data) {
  throw new Error(
    'Patient already admitted'
  );
}
  const admissionNumber =
    `ADM${Date.now()}`;

  const { data, error } =
    await supabase
      .from('admissions')
      .insert([
        {
          patient_id: request.patientId,
          admission_number: admissionNumber,
          doctor_assigned:
            request.doctorAssigned,
          diagnosis:
            request.diagnosis,
          billing_type:
            request.billingType,
          billing_remarks:
            request.billingRemarks,
          status: 'ACTIVE',
        },
      ])
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}