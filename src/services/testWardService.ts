import { getWards } from './wardService';

export async function testWardLoad() {
  const wards = await getWards();

  console.log(
    'WARDS LOADED:',
    wards.length
  );

  console.log(wards);
}