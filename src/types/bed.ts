export interface Bed {
  id: string;

  wardId: string;

  bedNumber: string;

  status:
    | 'AVAILABLE'
    | 'OCCUPIED'
    | 'MAINTENANCE';

  active: boolean;
}