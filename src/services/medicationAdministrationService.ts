import { supabase } from '../lib/supabase';

export async function saveMedicationAdministration(
  medicationOrderId: string,
  status: string,
  administeredAt: string,
  administeredBy: string,
  remarks: string
) {
  const { error } = await supabase
    .from('medication_administrations')
    .insert({
      medication_order_id: medicationOrderId,
      status,
      administered_at: administeredAt,
      administered_by: administeredBy,
      remarks,
    });

  if (error) {
    throw error;
  }
}

export async function getMedicationAdministrations(
  medicationOrderId: string
) {
  const { data, error } = await supabase
    .from('medication_administrations')
    .select('*')
    .eq(
      'medication_order_id',
      medicationOrderId
    )
    .order(
      'administered_at',
      {
        ascending: false,
      }
    );

  if (error) {
    throw error;
  }

  return data || [];
}