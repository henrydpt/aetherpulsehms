import { supabase } from '../lib/supabase';
import {
  createBillForService,
} from './billingEngineService';
import {
  createOpBillForService,
} from './billingEngineService';
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

  await createOpBillForService(

    encounterId,

    'CONSULTATION',

    'OP_CONSULTATION',

    encounterId,

    1

  );

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