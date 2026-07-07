export const MEDICATION_STATUS = {

  PENDING: 'PENDING',

  DISPENSED: 'DISPENSED',

  COMPLETED: 'COMPLETED',

} as const;

export type MedicationStatus =
  typeof MEDICATION_STATUS[
    keyof typeof MEDICATION_STATUS
  ];