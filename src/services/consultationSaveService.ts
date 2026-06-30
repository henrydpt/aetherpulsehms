import { supabase }
  from '../lib/supabase';

export async function
saveConsultation(
  data: any
) {
  const { error } =
    await supabase
      .from(
        'op_consultations'
      )
      .insert([data]);

  if (error) {
    throw error;
  }

  return true;
}