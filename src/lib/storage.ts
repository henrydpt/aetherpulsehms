import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';

export async function uploadEvidence(
  uri: string
) {
  const base64 =
    await FileSystem.readAsStringAsync(
      uri,
      {
        encoding:
          FileSystem.EncodingType.Base64,
      }
    );

  const fileName =
    `evidence/${Date.now()}.jpg`;

  const { error } =
    await supabase.storage
      .from('evidence')
      .upload(
        fileName,
        decode(base64),
        {
          contentType:
            'image/jpeg',
        }
      );

  if (error) {
    throw error;
  }

  const { data } =
    supabase.storage
      .from('evidence')
      .getPublicUrl(
        fileName
      );

  return data.publicUrl;
}