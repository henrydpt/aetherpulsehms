import { supabase }
  from '../lib/supabase';

export async function
getLatestConsultation(
  patientId: string
) {
  const { data } =
    await supabase
      .from(
        'op_consultations'
      )
      .select('*')
      .eq(
        'patient_id',
        patientId
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      )
      .limit(1)
      .single();

  return data;
}