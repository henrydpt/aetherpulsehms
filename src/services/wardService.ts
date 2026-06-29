import { supabase } from '../lib/supabase';

export interface Ward {
  id: string;
  name: string;
  ward_type: string;
  total_beds: number;
  active: boolean;
}

export async function getWards() {
  const { data, error } = await supabase
    .from('wards')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.log(error);
    return [];
  }

  return data as Ward[];
}