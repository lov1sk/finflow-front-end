export function formatToCurrency(value?: number) {
  if (!value) value = 0;

  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
