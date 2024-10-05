import { Transaction } from "@/types/transaction";
import { randomUUID } from "crypto";

const userId = randomUUID();
export const transactionsMock: Transaction[] = [
  {
    id: randomUUID(),
    name: "Transaction-1",
    category: "Compras",
    type: "debit",
    value: -1000,
    userId,
  },
  {
    id: randomUUID(),
    name: "Transaction-2",
    category: "Compras",
    type: "debit",
    value: -1200,
    userId,
  },
  {
    id: randomUUID(),
    name: "Transaction-3",
    category: "Salario",
    type: "credit",
    value: 1500,
    userId,
  },
];
