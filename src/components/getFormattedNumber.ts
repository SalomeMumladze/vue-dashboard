import { currency_options } from "./Currency";

export default function getFormattedNumber(
  value: number | string,
  currency: string | null = null
): string {
  const numericValue = Number(value);

  if (isNaN(numericValue)) return "0";

  const hasDecimal = numericValue % 1 !== 0;
  const decimalPlaces = hasDecimal ? 2 : 0;

  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numericValue);

  const currencyConfig = currency
    ? currency_options[currency.toUpperCase()]
    : undefined;

  const symbol = currencyConfig?.symbol || "";

  return `${symbol}${formattedValue}`;
}
