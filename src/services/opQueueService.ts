import { supabase } from '../lib/supabase';

export async function getWaitingQueue() {

  const { data, error } =
    await supabase
      .from('op_encounters')
      .select('*')
      .in(
        'status',
        [
          'WAITING',
          'IN_CONSULTATION',
        ]
      )
      .order(
        'created_at',
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}