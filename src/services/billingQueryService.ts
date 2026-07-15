import { supabase } from '../lib/supabase';

export async function getBillingTransactions(
  admissionId: string
) {

  const { data, error } =
    await supabase
      .from('billing_transactions')
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