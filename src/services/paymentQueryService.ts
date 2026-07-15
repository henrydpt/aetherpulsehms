import { supabase } from '../lib/supabase';

export async function getPayments(
  admissionId: string
) {

  const { data, error } =
    await supabase
      .from('payments')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .order(
        'received_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];

}