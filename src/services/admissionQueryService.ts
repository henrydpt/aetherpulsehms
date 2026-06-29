import { supabase } from '../lib/supabase';

export async function getActiveAdmissions() {
  const { data, error } =
    await supabase
      .from('admissions')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('created_at', {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data || [];
}