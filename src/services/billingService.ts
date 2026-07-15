import { supabase } from '../lib/supabase';

export async function createBillingTransaction(
  admissionId: string,
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