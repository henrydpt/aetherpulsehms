import { supabase } from '../lib/supabase';

export async function createPayment(

  admissionId: string,

  amount: number,

  paymentMode: string,

  receivedBy: string,

  remarks: string

) {

  const { error } =
    await supabase
      .from('payments')
      .insert({

        admission_id:
          admissionId,

        amount,

        payment_mode:
          paymentMode,

        received_by:
          receivedBy,

        remarks,

      });

  if (error) {
    throw error;
  }

}