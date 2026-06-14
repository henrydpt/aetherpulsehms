import { create } from 'zustand';
import {
  generateDailyTasks,
  seedPatientTasks,
} from '../services/taskGenerator';

interface TaskStore {
  tasks: any[];

  addTask: (
    task: any
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
addTask: (task) =>
  set((state) => ({
    tasks: [
      task,
      ...state.tasks,
    ],
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
