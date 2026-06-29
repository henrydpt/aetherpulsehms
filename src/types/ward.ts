export interface Ward {
  id: string;

  name: string;

  wardType:
    | 'GENERAL'
    | 'ICU'
    | 'EMERGENCY'
    | 'PRIVATE';

  totalBeds: number;

  active: boolean;
}