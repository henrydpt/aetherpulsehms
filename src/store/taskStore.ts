import { create } from 'zustand';
import { generateDailyTasks } from '../services/taskGenerator';

interface TaskStore {
  tasks: any[];

  completeTask: (
    taskId: string
  ) => void;
}

export const useTaskStore =
  create<TaskStore>((set) => ({
    tasks: generateDailyTasks(),

    completeTask: (taskId) =>
      set((state) => ({
        tasks: state.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'COMPLETED',
                  statusColor: '#16A34A',
                }
              : task
        ),
      })),
  }));
