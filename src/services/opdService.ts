import { supabase } from '../lib/supabase';

export async function createOpEncounter(
  patientId: string
) {

  const tokenNumber =
    `OP${Date.now()}`;

  const { data, error } =
    await supabase
      .from('op_encounters')
      .insert([
        {
          patient_id: patientId,
          token_number: tokenNumber,
          status: 'WAITING',
        },
      ])
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}