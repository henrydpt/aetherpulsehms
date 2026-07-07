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
      .select(`
  id,
  name,
  age,
  gender,
  doctor_assigned
`);

return (queue || []).map(
  (encounter) => {

    const patient =
      patients?.find(
        (p) =>
          p.id ===
          encounter.patient_id
      );

    return {
      ...encounter,

      patientName:
        patient?.name || 'Unknown',

      patientAge:
        patient?.age,

      patientGender:
        patient?.gender,

      doctorAssigned:
        patient?.doctor_assigned,
    };

  }
);
}