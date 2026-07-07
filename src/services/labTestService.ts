import { supabase } from '../lib/supabase';

export async function saveLabTest(
  test: any
) {
  const { data, error } =
    await supabase
      .from('lab_test_master')
      .insert(test)
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function updateLabTest(
  id: string,
  test: any
) {

  const { data, error } =
    await supabase
      .from('lab_test_master')
      .update(test)
      .eq('id', id)
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;

}
export async function getLabTests() {

  const { data, error } =
    await supabase
      .from('lab_test_master')
      .select('*')
      .eq('active', true)
      .order(
        'test_name',
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}

export async function searchLabTests(
  search: string
) {

  const { data, error } =
    await supabase
      .from('lab_test_master')
      .select('*')
      .eq('active', true)
      .or(
        `test_name.ilike.%${search}%,test_code.ilike.%${search}%`
      )
      .order(
        'test_name',
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}