"use server";

interface RemoveTransactionRequest {
  id: string;
}
export async function removeTransaction({
  id,
}: RemoveTransactionRequest): Promise<void> {
  console.log({ msg: `removing transaction ${id}...` });
}
