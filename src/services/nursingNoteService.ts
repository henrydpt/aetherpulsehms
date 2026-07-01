import { supabase } from '../lib/supabase';

export async function saveNursingNote(
  admissionId: string,
  noteText: string,
  createdBy = 'Nursing Staff'
) {
  const { error } = await supabase
    .from('nursing_notes')
    .insert({
      admission_id: admissionId,
      note_text: noteText,
      created_by: createdBy,
    });

  if (error) {
    throw error;
  }
}

export async function getNursingNotes(
  admissionId: string
) {
  const { data, error } =
    await supabase
      .from('nursing_notes')
      .select('*')
      .eq(
        'admission_id',
        admissionId
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data || [];
}