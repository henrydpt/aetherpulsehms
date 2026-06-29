export interface OpEncounter {
  id: string;

  patientId: string;

  tokenNumber: string;

  doctorAssigned?: string;

  visitReason?: string;

  visitDate: string;

  status:
    | 'WAITING'
    | 'IN_CONSULTATION'
    | 'COMPLETED';
}