import { supabase } from '../lib/supabase';

export async function
getAdmissionsWithPatients() {

  const { data: admissions } =
    await supabase
      .from('admissions')
      .select('*')
      .order(
        'created_at',
        {
          ascending: false,
        }
      );

  const { data: patients } =
    await supabase
      .from('patients')
      .select(
        'id,name'
      );

const results = [];

for (const admission of admissions || []) {

  const patient =
    patients?.find(
      (p) =>
        p.id ===
        admission.patient_id
    );

  const { data: allocation } =
    await supabase
      .from('bed_allocations')
      .select('*')
      .eq(
        'admission_id',
        admission.id
      )
      .eq(
        'status',
        'ACTIVE'
      )
      .maybeSingle();

  let bedNumber = null;
  let wardName = null;

  if (allocation) {

    const { data: bed } =
      await supabase
        .from('beds')
        .select('*')
        .eq(
          'id',
          allocation.bed_id
        )
        .single();

    if (bed) {

      bedNumber =
        bed.bed_number;

      const { data: ward } =
        await supabase
          .from('wards')
          .select('*')
          .eq(
            'id',
            bed.ward_id
          )
          .single();

      wardName =
        ward?.name;
    }
  }

  results.push({
    ...admission,
    patientName:
      patient?.name,
    bedNumber,
    wardName,
  });
}

return results;
}