import { supabase } from '../lib/supabase';

export async function getHospitalStats() {
  const [
    wardsResult,
    bedsResult,
    occupiedBedsResult,
    admissionsResult,
  ] = await Promise.all([
    supabase
      .from('wards')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('beds')
      .select('*', { count: 'exact', head: true }),

    supabase
      .from('beds')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'OCCUPIED'),

    supabase
      .from('admissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE'),
  ]);

  return {
    wards: wardsResult.count || 0,
    beds: bedsResult.count || 0,
    occupiedBeds:
      occupiedBedsResult.count || 0,
    availableBeds:
      (bedsResult.count || 0) -
      (occupiedBedsResult.count || 0),
    activeAdmissions:
      admissionsResult.count || 0,
  };
}