import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import {
  generateDailyTasks,
  seedPatientTasks,
} from '../services/taskGenerator';

interface TaskStore {
  tasks: any[];
setTasks: (
  tasks: any[]
) => void;

loadTasks: () => Promise<void>;
  addTask: (
    task: any
  ) => void;

  updateTask: (
  taskId: string,
  updates: any
) => void;

deleteTask: (
  taskId: string
) => void;

completeTask: (
  taskId: string,
  completionData?: any
) => Promise<void>;
}

export const useTaskStore =
  create<TaskStore>((set) => ({
tasks: [],
setTasks: (tasks) =>
  set({
    tasks,
  }),

loadTasks: async () => {
  const { data, error } =
    await supabase
      .from('tasks')
      .select('*');

  if (error) {
    console.log(error);
    return;
  }

set({
  tasks:
    (data || []).map(
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
    ),
});
},
addTask: (task) =>
  set((state) => ({
    tasks: [
      task,
      ...state.tasks,
    ],
  })),

  updateTask: (
  taskId,
  updates
) =>
  set((state) => ({
    tasks: state.tasks.map(
      (task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
            }
          : task
    ),
  })),

deleteTask: (taskId) =>
  set((state) => ({
    tasks: state.tasks.filter(
      (task) =>
        task.id !== taskId
    ),
  })),
  
completeTask: async (
  taskId,
  completionData = {}
) => {
  const completedAt =
    new Date().toISOString();

  const { error } =
    await supabase
      .from('tasks')
.update({
  status: 'COMPLETED',
  status_color: '#16A34A',
  completed_by:
    completionData.completedBy ||
    'Nursing Staff',
  completed_at:
    completedAt,
  evidence_uri:
    completionData.evidenceUri,
  remarks:
    completionData.remarks || '',

  bp_systolic:
    completionData.vitals?.bpSystolic,

  bp_diastolic:
    completionData.vitals?.bpDiastolic,

  pulse:
    completionData.vitals?.pulse,

  spo2:
    completionData.vitals?.spo2,

  temperature:
    completionData.vitals?.temperature,

  respiratory_rate:
    completionData.vitals?.respiratoryRate,
})
      .eq('id', taskId);

  if (error) {
    console.log(error);
    return;
  }

  set((state) => ({
    tasks: state.tasks.map(
      (task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'COMPLETED',
              statusColor: '#16A34A',
              completedBy:
                completionData.completedBy ||
                'Nursing Staff',
              completedAt:
                completedAt,
              evidenceAttached: true,
              evidenceUri:
                completionData.evidenceUri,
              remarks:
                completionData.remarks || '',
              vitals:
                completionData.vitals || null,
            }
          : task
    ),
  }));
},
}));