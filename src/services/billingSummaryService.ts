import {
  getBillingTransactions,
} from './billingQueryService';

export async function
getBillingSummary(
  admissionId: string
) {

  const transactions =
    await getBillingTransactions(
      admissionId
    );

  const totalCharges =
    transactions.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    );

  const paidTransactions =
    transactions.filter(
      (item) =>
        item.status === 'PAID'
    ).length;

  const pendingTransactions =
    transactions.filter(
      (item) =>
        item.status === 'PENDING'
    ).length;

  const totalPaid =
    transactions
      .filter(
        (item) =>
          item.status === 'PAID'
      )
      .reduce(
        (sum, item) =>
          sum +
          Number(item.amount),
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