import { getWards }
  from './wardService';

export async function
loadWardOptions() {
  return await getWards();
}