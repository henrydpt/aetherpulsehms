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

  return admission;
}