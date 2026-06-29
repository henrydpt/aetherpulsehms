import { supabase } from '../lib/supabase';

export async function getActiveOpEncounter(
  patientId: string
) {
  const { data, error } =
    await supabase
      .from('op_encounters')
      .select('*')
      .eq(
        'patient_id',
        patientId
      )
      .in(
        'status',
        [
          'WAITING',
          'IN_CONSULTATION',
        ]
      )
      .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}