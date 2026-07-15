import { supabase } from '../lib/supabase';

export async function getCharge(
  serviceCode: string
) {

  const { data, error } =
    await supabase
      .from('charge_master')
      .select('*')
      .eq(
        'service_code',
        serviceCode
      )
      .eq(
        'active',
        true
      )
      .single();

  if (error) {
    throw error;
  }

  return data;

}