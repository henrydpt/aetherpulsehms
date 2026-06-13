import { taskTemplates } from '../data/taskTemplates';

export function generateDailyTasks() {
  return taskTemplates
    .filter(
      (template) =>
        template.frequency === 'DAILY'
    )
    .map((template) => ({
      id: `${template.id}-${Date.now()}`,

      status: 'PENDING',

      statusColor: '#D97706',

      title: template.name,

      location: 'Hospital',

      due: 'Today',

      assigned: template.category,

      dueText: '',
    }));
}