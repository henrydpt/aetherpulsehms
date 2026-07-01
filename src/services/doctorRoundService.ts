import { supabase } from '../lib/supabase';

export async function saveDoctorRound(
  admissionId: string,
  doctorName: string,
  progressNote: string,
  treatmentPlan: string,
  followUpDate: string
) {
  const { error } = await supabase
    .from('doctor_rounds')
    .insert({
      admission_id: admissionId,
      doctor_name: doctorName,
      progress_note: progressNote,
      treatment_plan: treatmentPlan,
      follow_up_date: followUpDate,
    });

  if (error) {
    throw error;
  }
}

export async function getDoctorRounds(
  admissionId: string
) {
  const { data, error } =
    await supabase
      .from('doctor_rounds')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}