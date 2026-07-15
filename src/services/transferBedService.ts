import { supabase } from '../lib/supabase';

export async function transferBed(
  admissionId: string,
  currentBedId: string,
  newBedId: string
) {

  const { data: allocation } =
    await supabase
      .from('bed_allocations')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .eq(
        'status',
        'ACTIVE'
      )
      .single();

  if (!allocation) {
    throw new Error(
      'Active bed allocation not found.'
    );
  }

  await supabase
    .from('bed_allocations')
    .update({
      status: 'RELEASED',
      released_at:
        new Date().toISOString(),
    })
    .eq(
      'id',
      allocation.id
    );

  await supabase
    .from('beds')
    .update({
      status: 'AVAILABLE',
    })
    .eq(
      'id',
      currentBedId
    );

  await supabase
    .from('bed_allocations')
    .insert({
      admission_id:
        admissionId,
      bed_id:
        newBedId,
      status:
        'ACTIVE',
    });

  await supabase
    .from('beds')
    .update({
      status: 'OCCUPIED',
    })
    .eq(
      'id',
      newBedId
    );

}