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
        taskCategory: 'ADMIN',

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
    id: `VITALS-${patient.id}-${time}`,
    status: 'PENDING',
    statusColor: '#D97706',
    dueText: '',
    title: `${time} Vitals Assessment`,
    patientId: patient.id,
    patientName: patient.name,
    location: patient.ward,
    due: time,
    dueDate:
  new Date()
    .toISOString()
    .split('T')[0],

dueTime: time,

priority: 'HIGH',

escalationMinutes: 30,
    assigned: 'Nursing Staff',
    type: 'VITALS',
    taskCategory: 'PATIENT',
  }));
  }
  export function seedPatientTasks() {
  const patients = [
    {
      id: 'PAT001',
      name: 'Ravi Kumar',
      ward: 'General Ward - 2 / 205',
    },
    {
      id: 'PAT002',
      name: 'Lakshmi Devi',
      ward: 'General Ward - 1 / 103',
    },
    {
      id: 'PAT003',
      name: 'Ramesh Babu',
      ward: 'General Ward - 1 / 104',
    },
  ];

  return patients.flatMap((patient) =>
    generateVitalsTasks(patient)
  );
}