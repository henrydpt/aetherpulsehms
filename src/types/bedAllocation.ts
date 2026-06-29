export interface BedAllocation {
  id: string;

  admissionId: string;

  bedId: string;

  allocatedAt: string;

  releasedAt?: string;

  status:
    | 'ACTIVE'
    | 'RELEASED';
}