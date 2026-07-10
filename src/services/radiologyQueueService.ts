import { supabase } from '../lib/supabase';

export async function getRadiologyOrders() {

  const { data, error } =
    await supabase
      .from('radiology_orders')
.select(`
  *,
  radiology_order_items(
    *,
    radiology_procedure_master(
      procedure_name,
      procedure_code
    )
  )
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