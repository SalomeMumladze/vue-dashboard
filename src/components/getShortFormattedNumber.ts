import { currency_options } from "./Currency";

export default function getShortFormattedNumber(
  num: number | string,
  currency: string | null = null
): string {
  const numericValue = typeof num === "string" ? Number(num) : num;
  if (isNaN(numericValue)) return "0";

  const currencyConfig = currency
    ? currency_options[currency.toUpperCase()]
    : undefined;

  const formatter = new Intl.NumberFormat("en-US", {
    ...({ notation: "compact", compactDisplay: "short" } as any),
  });

  return currencyConfig
    ? `${currencyConfig.symbol}${formatter.format(numericValue)}`
    : formatter.format(numericValue);
}
