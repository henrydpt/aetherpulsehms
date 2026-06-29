import { supabase } from '../lib/supabase';

export async function getActiveAdmission(
  patientId: string
) {
  const { data, error } =
    await supabase
      .from('admissions')
      .select('*')
      .eq(
        'patient_id',
        patientId
      )
      .eq(
        'status',
        'ACTIVE'
      )
      .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}