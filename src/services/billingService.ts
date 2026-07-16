import { supabase } from '../lib/supabase';

export async function createBillingTransaction(
  admissionId: string | null,
  encounterId: string | null,
  sourceModule: string,
  sourceId: string | null,
  description: string,
  quantity: number,
  unitPrice: number
) {

  const { error } =
    await supabase
      .from('billing_transactions')
      .insert({

        admission_id:
          admissionId,
encounter_id:
  encounterId,
        source_module:
          sourceModule,

        source_id:
          sourceId,

        description,

        quantity,

        unit_price:
          unitPrice,

        amount:
          quantity * unitPrice,

      });

  if (error) {
    throw error;
  }

}