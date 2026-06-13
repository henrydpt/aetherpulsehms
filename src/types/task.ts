export type TaskCategory =
  | 'ADMIN'
  | 'NURSING';

export type TaskStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'OVERDUE';

export interface Task {
  id: string;

  templateId: string;

  category: TaskCategory;

  title: string;

  assignedRole: string;

  assignedUser?: string;

  patientId?: string;

  evidenceRequired: boolean;

  photoRequired: boolean;

  scheduledTime: string;

  status: TaskStatus;

  createdAt: string;

  completedAt?: string;
}