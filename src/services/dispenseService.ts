import { supabase } from '../lib/supabase';
import {
  getAdmissionContext,
} from './admissionContextService';
import {
  MEDICATION_STATUS,
} from '../constants/medicationStatus';
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

  const { error } =
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
      });

  if (error) {
    throw error;
  }

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