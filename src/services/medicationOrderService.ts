import { supabase } from '../lib/supabase';
import {
  MEDICATION_STATUS,
} from '../constants/medicationStatus';
export async function saveMedicationOrder(
  admissionId: string,
  medicationName: string,
  dose: string,
  route: string,
  frequency: string,
  durationDays: number,
  instructions: string,
  orderedBy = 'Doctor'
) {
  const { error } = await supabase
    .from('medication_orders')
    .insert({
      admission_id: admissionId,
      medication_name: medicationName,
      dose,
      route,
      frequency,
      duration_days: durationDays,
      instructions,
      ordered_by: orderedBy,
      status:
  MEDICATION_STATUS.PENDING,
    });

  if (error) {
    throw error;
  }
}

export async function getMedicationOrders(
  admissionId: string
) {
  const { data, error } = await supabase
    .from('medication_orders')
    .select('*')
.eq(
  'admission_id',
  admissionId
)
.eq(
  'status',
  'DISPENSED'
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

  return data || [];
}

export async function updateMedicationOrderStatus(
  medicationOrderId: string,
  status: string
) {

  const { error } =
    await supabase
      .from('medication_orders')
      .update({
        status,
      })
      .eq(
        'id',
        medicationOrderId
      );

  if (error) {
    throw error;
  }

}