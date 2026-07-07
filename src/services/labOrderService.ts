import { supabase } from '../lib/supabase';

export async function createLabOrder(
  order: any,
  tests: any[]
) {

  const {
    data: labOrder,
    error: orderError,
  } = await supabase
    .from('lab_orders')
    .insert(order)
    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  const items =
    tests.map((test) => ({
      lab_order_id:
        labOrder.id,
      test_id:
        test.id,
    }));

  const { error: itemError } =
    await supabase
      .from('lab_order_items')
      .insert(items);

  if (itemError) {
    throw itemError;
  }

  return labOrder;

}