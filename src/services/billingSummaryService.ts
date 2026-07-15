import {
  getBillingTransactions,
} from './billingQueryService';
import {
  getPayments,
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