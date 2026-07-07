import { supabase } from '../lib/supabase';

export async function getAdmissionContext(
  admissionId: string
) {

  const {
    data: admission,
    error,
  } = await supabase
    .from('admissions')
    .select('*')
    .eq(
      'id',
      admissionId
    )
    .single();

  if (error) {
    throw error;
  }

  const {
    data: patient,
  } = await supabase
    .from('patients')
    .select('*')
    .eq(
      'id',
      admission.patient_id
    )
    .single();

  const {
    data: bedAllocation,
  } = await supabase
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
    .maybeSingle();

  let bed = null;

  if (bedAllocation) {

    const {
      data,
    } = await supabase
      .from('beds')
      .select('*')
      .eq(
        'id',
        bedAllocation.bed_id
      )
      .single();

    bed = data;

  }

  return {
    ...admission,
    patient,
    bedAllocation,
    bed,
  };

}