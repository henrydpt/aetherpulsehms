import { supabase }
  from '../lib/supabase';

export async function
saveConsultation(
  data: any
) {

  const {
    data: consultation,
    error,
  } =
    await supabase
      .from(
        'op_consultations'
      )
      .insert([data])
      .select()
      .single();

  if (error) {
    throw error;
  }

  return consultation;

}