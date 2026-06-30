import { supabase } from '../lib/supabase';

export async function getOpStats() {

  const { data } =
    await supabase
      .from('op_encounters')
      .select('status');

  const waiting =
    data?.filter(
      (x) =>
        x.status === 'WAITING'
    ).length || 0;

  const inConsultation =
    data?.filter(
      (x) =>
        x.status ===
        'IN_CONSULTATION'
    ).length || 0;

  const completed =
    data?.filter(
      (x) =>
        x.status ===
        'COMPLETED'
    ).length || 0;

  return {
    waiting,
    inConsultation,
    completed,
  };
}