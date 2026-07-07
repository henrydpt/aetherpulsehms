import { getWards } from './wardService';

export async function testWardLoad() {
  const wards = await getWards();

}