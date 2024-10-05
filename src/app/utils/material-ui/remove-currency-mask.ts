export function removeCurrencyMask(value: string) {
  const valueWithoutSimbols = value
    .replace(/R\$/, "")
    .replaceAll(".", "n")
    .replace(",", ".")
    .replaceAll("n", "");
  return parseFloat(valueWithoutSimbols);
}
