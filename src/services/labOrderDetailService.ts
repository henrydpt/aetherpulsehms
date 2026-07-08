import { supabase } from '../lib/supabase';

export async function getLabOrderItems(
  labOrderId: string
) {

  const { data, error } =
    await supabase
      .from('lab_order_items')
      .select(`
        *,
        lab_test_master(
          test_name,
          test_code,
          department
        )
      `)
      .eq(
        'lab_order_id',
        labOrderId
      );

  if (error) {
    throw error;
  }

  return data || [];

}