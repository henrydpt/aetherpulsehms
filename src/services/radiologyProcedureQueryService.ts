import { supabase } from '../lib/supabase';

export async function loadRadiologyProcedures() {

  const { data, error } =
    await supabase
      .from(
        'radiology_procedure_master'
      )
      .select('*')
      .eq('active', true)
      .order(
        'procedure_name'
      );

  if (error) {
    throw error;
  }

  return data || [];

}