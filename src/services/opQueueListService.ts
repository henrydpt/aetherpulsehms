import { supabase } from '../lib/supabase';

export async function getOpQueueWithPatients() {

  const { data: queue } =
    await supabase
      .from('op_encounters')
      .select('*')
      .in(
        'status',
        [
          'WAITING',
          'IN_CONSULTATION',
        ]
      )
      .order(
        'created_at',
        {
          ascending: true,
        }
      );

  const { data: patients } =
    await supabase
      .from('patients')
      .select('id,name');

  return (queue || []).map(
    (encounter) => ({
      ...encounter,
      patientName:
        patients?.find(
          (p) =>
            p.id ===
            encounter.patient_id
        )?.name || 'Unknown',
    })
  );
}