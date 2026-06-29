import { supabase } from '../lib/supabase';

export async function allocateBed(
  admissionId: string,
  bedId: string
) {
  const { data, error } =
    await supabase
      .from('bed_allocations')
      .insert([
        {
          admission_id: admissionId,
          bed_id: bedId,
          status: 'ACTIVE',
        },
      ])
      .select()
      .single();

  if (error) {
    throw error;
  }

  await supabase
    .from('beds')
    .update({
      status: 'OCCUPIED',
    })
    .eq('id', bedId);

  return data;
}