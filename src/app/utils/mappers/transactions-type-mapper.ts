export function transactionsTypeMapper(type: string): string {
  const availableTypes: Record<string, string> = {
    credit: "Crédito",
    debit: "Débito",
  };
  return availableTypes[type] ?? "N/D";
}
