"use server";

import { Transaction } from "@/types/transaction";
import { transactionsMock } from "./mocks/transactions";

interface GetTransactionsResponse {
  transactions: Transaction[];
}
export async function getTransactions(): Promise<GetTransactionsResponse> {
  console.log({ transactions: transactionsMock });

  return { transactions: transactionsMock };
}
