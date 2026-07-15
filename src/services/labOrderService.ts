import { supabase } from '../lib/supabase';

import {
  createBillForService,
} from './billingEngineService';

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

for (const test of tests) {

  await createBillForService(

    order.admission_id,

    test.test_code,

    'LAB',

    labOrder.id,

    1

  );

}

return labOrder;

}