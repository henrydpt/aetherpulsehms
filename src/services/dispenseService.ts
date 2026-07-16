import { supabase } from '../lib/supabase';
import {
  getAdmissionContext,
} from './admissionContextService';
import {
  MEDICATION_STATUS,
} from '../constants/medicationStatus';
import {
  createBillForService,
} from './billingEngineService';
export async function getPendingMedicationOrders() {

  const { data: orders, error } =
    await supabase
      .from('medication_orders')
      .select('*')
      .eq(
  'status',
  MEDICATION_STATUS.PENDING
)
      .order(
        'ordered_at',
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  const result = [];

  for (const order of orders || []) {

const admission =
  await getAdmissionContext(
    order.admission_id
  );

result.push({
  ...order,
  admission,
  patient:
    admission.patient,
});

  }

  return result;

}
export async function createMedicationDispense(

  medicationOrderId: string,
  inventoryId: string,
  quantity: number,
  dispensedBy: string,
  remarks: string
) {
const { data: medicationOrder, error: orderError } =
  await supabase
    .from('medication_orders')
    .select('*')
    .eq(
      'id',
      medicationOrderId
    )
    .single();

if (orderError) {
  throw orderError;
}
const { data: inventory, error: inventoryError } =
  await supabase
    .from('pharmacy_inventory')
    .select(`
      id,
      medicines (
        service_code
      )
    `)
    .eq(
      'id',
      inventoryId
    )
    .single();

if (inventoryError) {
  throw inventoryError;
}
const {
  data: dispense,
  error,
} =
  await supabase
    .from('medication_dispense')
    .insert({
      medication_order_id:
        medicationOrderId,
      inventory_id:
        inventoryId,
      quantity,
      dispensed_by:
        dispensedBy,
      remarks,
    })
    .select()
    .single();

if (error) {
  throw error;
}

const serviceCode =
  inventory.medicines?.[0]?.service_code;

if (!serviceCode) {
  throw new Error(
    'Medicine service code not found.'
  );
}

await createBillForService(

  medicationOrder.admission_id,

  null,

  serviceCode,

  'PHARMACY',

  dispense.id,

  quantity

);

}
export async function getDispensedMedicationOrders() {

  const { data: orders, error } =
    await supabase
      .from('medication_orders')
      .select('*')
      .eq(
  'status',
  MEDICATION_STATUS.DISPENSED
)
      .order(
        'ordered_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  const result = [];

  for (const order of orders || []) {

const admission =
  await getAdmissionContext(
    order.admission_id
  );

result.push({
  ...order,
  admission,
  patient:
    admission.patient,
});

  }

  return result;

}