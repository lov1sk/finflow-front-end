"use server";

interface CreateTransactionRequest {
  name: string;
  value: number;
  category: string;
  type: string;
}

export async function createTransaction(
  payload: CreateTransactionRequest
): Promise<void> {
  console.log({ payload });
}
