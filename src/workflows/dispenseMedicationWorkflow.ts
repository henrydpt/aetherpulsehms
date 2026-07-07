import {
  createMedicationDispense,
} from '../services/dispenseService';

import {
  reduceInventory,
} from '../services/inventoryService';

import {
  updateMedicationOrderStatus,
} from '../services/medicationOrderService';
import {
  MEDICATION_STATUS,
} from '../constants/medicationStatus';

export async function dispenseMedicationWorkflow(
  medicationOrderId: string,
  inventoryId: string,
  quantity: number,
  dispensedBy: string,
  remarks: string
) {

  try {

    await createMedicationDispense(
      medicationOrderId,
      inventoryId,
      quantity,
      dispensedBy,
      remarks
    );

    await reduceInventory(
      inventoryId,
      quantity
    );

    await updateMedicationOrderStatus(
      medicationOrderId,
      MEDICATION_STATUS.DISPENSED
    );

    return {
      success: true,
      message:
        'Medication dispensed successfully.',
    };

  } catch (error: any) {

    return {
      success: false,
      message:
        error.message,
    };

  }

}