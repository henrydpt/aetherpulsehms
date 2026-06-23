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
  ) => void;
}

export const useTaskStore =
  create<TaskStore>((set) => ({
  tasks: [
  ...generateDailyTasks(),
  ...seedPatientTasks(),
],
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
  
completeTask: (
  taskId,
  completionData = {}
) =>
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
                new Date().toISOString(),

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
  })),
  }));
