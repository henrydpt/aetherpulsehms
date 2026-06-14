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
        type: 'ADMIN',

      dueText: '',
    }));
    }
export function generateVitalsTasks(patient: any) {
  return [
    '06:00 AM',
    '10:00 AM',
    '02:00 PM',
    '06:00 PM',
    '10:00 PM',
    '02:00 AM',
  ].map((time) => ({
    status: 'PENDING',
    title: `${time} Vitals Assessment`,
    patientId: patient.id,
    patientName: patient.name,
    location: patient.ward,
    due: time,
    assigned: 'Nursing Staff',
    type: 'VITALS',
  }));
}