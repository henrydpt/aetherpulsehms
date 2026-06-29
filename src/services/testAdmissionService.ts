import { createAdmission }
  from './admissionService';

export async function
testAdmission(patientId: string) {

  const admission =
    await createAdmission({
      patientId,
      diagnosis:
        'General Observation',
    });

  console.log(
    'ADMISSION CREATED',
    admission
  );

  return admission;
}