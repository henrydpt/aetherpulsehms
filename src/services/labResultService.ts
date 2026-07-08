import { supabase } from '../lib/supabase';

export async function saveLabResult(
  item: any
) {

  const { error } =
    await supabase
      .from('lab_order_items')
      .update({

        result:
          item.result,

        remarks:
          item.remarks,

        status:
          'COMPLETED',

        completed_at:
          new Date()
            .toISOString(),

      })
      .eq(
        'id',
        item.id
      );

  if (error) {
    throw error;
  }
const {
  data: pendingItems,
  error: pendingError,
} = await supabase
  .from('lab_order_items')
  .select('id')
  .eq(
    'lab_order_id',
    item.lab_order_id
  )
  .neq(
    'status',
    'COMPLETED'
  );

if (pendingError) {
  throw pendingError;
}

if (
  pendingItems.length === 0
) {

const {
  error: orderError,
} = await supabase
  .from('lab_orders')
  .update({
    status: 'COMPLETED',
  })
  .eq(
    'id',
    item.lab_order_id
  );


if (orderError) {
  throw orderError;
}

}
}