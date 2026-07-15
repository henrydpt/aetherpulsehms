import { getCharge }
  from './chargeMasterService';

import {
  createBillingTransaction,
} from './billingService';

export async function
createBillForService(

  admissionId: string,

  serviceCode: string,

  sourceModule: string,

  sourceId: string,

  quantity = 1

) {

  const charge =
    await getCharge(
      serviceCode
    );

  if (!charge) {
    throw new Error(
      `Charge not found for ${serviceCode}`
    );
  }

  await createBillingTransaction(

    admissionId,

    sourceModule,

    sourceId,

    charge.service_name,

    quantity,

    charge.unit_price

  );

}