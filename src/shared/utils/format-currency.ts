type FormatCurrencyOptions = {
  currency?: string;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number,
  options?: FormatCurrencyOptions
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options?.currency ?? "USD",
    maximumFractionDigits:
      options?.maximumFractionDigits ?? 2,
  }).format(value);
}