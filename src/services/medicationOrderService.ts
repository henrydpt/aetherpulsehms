import { supabase } from '../lib/supabase';

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