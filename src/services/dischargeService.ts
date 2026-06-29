import { supabase } from '../lib/supabase';

export async function dischargeAdmission(
  admissionId: string
) {

  const allocation =
    await supabase
      .from('bed_allocations')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .eq('status', 'ACTIVE')
      .single();

  if (allocation.data) {

    await supabase
      .from('beds')
      .update({
        status: 'AVAILABLE',
      })
      .eq(
        'id',
        allocation.data.bed_id
      );

    await supabase
      .from('bed_allocations')
      .update({
        status: 'RELEASED',
        released_at:
          new Date().toISOString(),
      })
      .eq(
        'id',
        allocation.data.id
      );
  }

  await supabase
    .from('admissions')
    .update({
      status: 'DISCHARGED',
    })
    .eq('id', admissionId);
}