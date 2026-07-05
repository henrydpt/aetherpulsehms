import { supabase } from '../lib/supabase';

export async function getMedicines() {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function searchMedicines(
  searchText: string
) {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .ilike(
      'name',
      `%${searchText}%`
    )
    .eq('is_active', true)
    .order('name');

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getMedicine(
  id: string
) {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}