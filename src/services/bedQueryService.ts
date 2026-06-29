import { getAvailableBeds }
  from './bedService';

export async function
loadBeds(wardId: string) {
  return await getAvailableBeds(
    wardId
  );
}