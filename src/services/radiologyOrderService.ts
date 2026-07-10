import { supabase } from '../lib/supabase';

export async function createRadiologyOrder(
  patientId: string,
  admissionId: string,
  patientName: string,
  orderedBy: string,
  procedureIds: string[]
) {

  const { data: order, error } =
    await supabase
      .from('radiology_orders')
      .insert([
        {
          patient_id: patientId,
          admission_id: admissionId,
          patient_name: patientName,
          ordered_by: orderedBy,
        },
      ])
      .select()
      .single();

  if (error) {
    throw error;
  }

  const items =
    procedureIds.map(
      (procedureId) => ({
        radiology_order_id:
          order.id,
        procedure_id:
          procedureId,
      })
    );

  const { error: itemError } =
    await supabase
      .from(
        'radiology_order_items'
      )
      .insert(items);

  if (itemError) {
    throw itemError;
  }

  return order;

}