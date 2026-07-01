import { supabase } from '../lib/supabase';

export async function startConsultation(
  encounterId: string
) {
  await supabase
    .from('op_encounters')
    .update({
      status: 'IN_CONSULTATION',
    })
    .eq('id', encounterId);
}

export async function completeConsultation(
  encounterId: string
) {
  await supabase
    .from('op_encounters')
    .update({
      status: 'COMPLETED',
    })
    .eq('id', encounterId);
}
export async function admitEncounter(
  encounterId: string
) {
  await supabase
    .from('op_encounters')
    .update({
      status: 'ADMITTED',
    })
    .eq('id', encounterId);
}