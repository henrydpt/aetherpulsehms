import { supabase } from '../lib/supabase';

export async function getLabOrders() {

  const { data, error } =
    await supabase
      .from('lab_orders')
      .select(`
  *,
  lab_order_items(count)
`)
      .order(
        'ordered_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];

}