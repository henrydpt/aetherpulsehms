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
export async function saveDischargeSummary(
  admissionId: string,
  dischargeDiagnosis: string,
  hospitalCourse: string,
  dischargeMedications: string,
  dischargeInstructions: string,
  followUpDate: string,
  dischargedBy = 'Doctor'
) {
  const { error } = await supabase
    .from('discharge_summaries')
    .insert({
      admission_id: admissionId,
      discharge_diagnosis: dischargeDiagnosis,
      hospital_course: hospitalCourse,
      discharge_medications: dischargeMedications,
      discharge_instructions: dischargeInstructions,
      follow_up_date: followUpDate,
      discharged_by: dischargedBy,
    });

  if (error) {
    throw error;
  }
}

export async function getDischargeSummary(
  admissionId: string
) {
  const { data, error } =
    await supabase
      .from('discharge_summaries')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .order(
        'discharged_at',
        {
          ascending: false,
        }
      )
      .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] || null;
}