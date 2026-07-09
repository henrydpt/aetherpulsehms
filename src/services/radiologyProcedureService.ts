import { supabase } from '../lib/supabase';

export async function addProcedure(
  procedure: any
) {

  const { error } =
    await supabase
      .from(
        'radiology_procedure_master'
      )
      .insert(procedure);

  if (error) {
    throw error;
  }

}

export async function getProcedures() {

  const {
    data,
    error,
  } = await supabase
    .from(
      'radiology_procedure_master'
    )
    .select('*')
    .eq(
      'active',
      true
    )
    .order(
      'procedure_name'
    );

  if (error) {
    throw error;
  }

  return data || [];

}