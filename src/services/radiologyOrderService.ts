import { supabase } from '../lib/supabase';
import {
  createBillForService,
} from './billingEngineService';
export async function createRadiologyOrder(
  patientId: string,
  admissionId: string,
  patientName: string,
  orderedBy: string,
  procedures: any[]
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
  procedures.map(
    (procedure) => ({
      radiology_order_id:
        order.id,
      procedure_id:
        procedure.id,
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

for (const procedure of procedures) {

await createBillForService(

  admissionId,

  null,

  procedure.service_code,

  'RADIOLOGY',

  order.id,

  1

);

}

return order;

}