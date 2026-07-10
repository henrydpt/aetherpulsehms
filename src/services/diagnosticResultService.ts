import { getLabOrders }
  from './labQueueService';

import { getRadiologyOrders }
  from './radiologyQueueService';

export async function
getDiagnosticResults() {

  const [
    labOrders,
    radiologyOrders,
  ] = await Promise.all([
    getLabOrders(),
    getRadiologyOrders(),
  ]);

  const diagnostics = [

...(labOrders || []).map(
  (order: any) => ({
    ...order,
    type: 'LAB',
    investigation:
      order.lab_order_items?.[0]
        ?.lab_test_master
        ?.test_name ??
      'Laboratory',
  })
),

...(radiologyOrders || []).map(
  (order: any) => ({
    ...order,
    type: 'RADIOLOGY',
    investigation:
      order
        .radiology_order_items?.[0]
        ?.radiology_procedure_master
        ?.procedure_name ??
      'Radiology',
  })
),

  ];

  diagnostics.sort(
    (a, b) =>
      new Date(
        b.ordered_at
      ).getTime() -
      new Date(
        a.ordered_at
      ).getTime()
  );

  return diagnostics;

}