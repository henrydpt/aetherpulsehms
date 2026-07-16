import {
  getBillingTransactions,
  getEncounterBillingTransactions,
} from './billingQueryService';
import {
  getPayments,
  getEncounterPayments,
} from './paymentQueryService';
export async function
getBillingSummary(
  admissionId: string
) {

  const transactions =
    await getBillingTransactions(
      admissionId
    );
const payments =
  await getPayments(
    admissionId
  );
  const totalCharges =
    transactions.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    );

const paidTransactions =
  payments.length;

const pendingTransactions =
  Math.max(
    transactions.length -
    payments.length,
    0
  );

const totalPaid =
  payments.reduce(
    (sum, payment) =>
      sum +
      Number(payment.amount),
    0
  );

  return {

    totalCharges,

    totalPaid,

    outstanding:
      totalCharges -
      totalPaid,

    transactionCount:
      transactions.length,

    pendingTransactions,

    paidTransactions,

  };

}
export async function
getEncounterBillingSummary(
  encounterId: string
) {

  const transactions =
    await getEncounterBillingTransactions(
      encounterId
    );

  const payments =
    await getEncounterPayments(
      encounterId
    );

  const totalCharges =
    transactions.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    );

  const totalPaid =
    payments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount),
      0
    );

  const paidTransactions =
    payments.length;

  const pendingTransactions =
    Math.max(
      transactions.length -
      payments.length,
      0
    );

  return {

    totalCharges,

    totalPaid,

    outstanding:
      totalCharges -
      totalPaid,

    transactionCount:
      transactions.length,

    pendingTransactions,

    paidTransactions,

  };

}