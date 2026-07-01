import { supabase }
  from '../lib/supabase';

export async function
getPatientTasks(
  patientId: string
) {
  const { data } =
    await supabase
      .from('tasks')
      .select('*')
      .eq(
        'patient_id',
        patientId
      )
      .order(
        'due_date',
        {
          ascending: false,
        }
      );

  return (data || []).map(
  (task: any) => ({
    ...task,

    patientId:
      task.patient_id,

    patientName:
      task.patient_name,

    statusColor:
      task.status_color,

    taskCategory:
      task.task_category,

    dueDate:
      task.due_date,

    dueTime:
      task.due_time,

    escalationMinutes:
      task.escalation_minutes,

    completedBy:
      task.completed_by,

    completedAt:
      task.completed_at,

    evidenceUri:
      task.evidence_uri,

    vitals:
      task.bp_systolic
        ? {
            bpSystolic:
              task.bp_systolic,

            bpDiastolic:
              task.bp_diastolic,

            pulse:
              task.pulse,

            spo2:
              task.spo2,

            temperature:
              task.temperature,

            respiratoryRate:
              task.respiratory_rate,
          }
        : null,
  })
);
}