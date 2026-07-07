import { supabase } from '../lib/supabase';

export interface Bed {
  id: string;
  ward_id: string;
  bed_number: string;
  status: string;
  active: boolean;
}

export async function getAvailableBeds(
  wardId: string
) {
  const { data, error } = await supabase
    .from('beds')
    .select('*')
    .eq('ward_id', wardId)
    .eq('active', true)
    .eq('status', 'AVAILABLE')
    .order('bed_number');

  if (error) {
    console.error('Bed Service Error:', error);
    return [];
  }

  return data as Bed[];
}