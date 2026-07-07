import {
  saveMedicationAdministration,
} from '../services/medicationAdministrationService';

import {
  updateMedicationOrderStatus,
} from '../services/medicationOrderService';

import {
  MEDICATION_STATUS,
} from '../constants/medicationStatus';
export async function administerMedicationWorkflow(
  medicationOrderId: string,
  status: string,
  administeredAt: string,
  administeredBy: string,
  remarks: string
) {

  try {

    await saveMedicationAdministration(
      medicationOrderId,
      status,
      administeredAt,
      administeredBy,
      remarks
    );

    await updateMedicationOrderStatus(
      medicationOrderId,
      MEDICATION_STATUS.COMPLETED
    );

    return {
      success: true,
      message:
        'Medication administration recorded successfully.',
    };

  } catch (error: any) {

    return {
      success: false,
      message:
        error.message,
    };

  }

}