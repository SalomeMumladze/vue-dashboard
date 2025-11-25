export default function getFormattedNumber(value: number | string): string {
  const numericValue = Number(value);

  if (isNaN(numericValue)) return "0";

  // Check if the number has a decimal part
  const hasDecimal = numericValue % 1 !== 0;
  const decimalPlaces = hasDecimal ? 2 : 0;

  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numericValue);

  return formattedValue;
}
