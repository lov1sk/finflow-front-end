export type Transaction = {
  idTransaction: string;
  date: string; // TODO:CHECK THIS
  description: string;
  valueTransaction: number;
  category: string;
  typeTransaction: string;
  idUser: string;
  formatedDate: string;
};

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}
