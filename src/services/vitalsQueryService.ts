import { supabase } from '../lib/supabase';

export async function getVitalsHistory(
  admissionId: string
) {
  const { data, error } =
    await supabase
      .from('vitals')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}