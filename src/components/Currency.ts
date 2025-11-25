export interface CurrencyOption {
  name: string;
  value: string;
  symbol: string;
  sign_location: "pre" | "post";
}

export const currency_options: Record<string, CurrencyOption> = {
  USD: { name: "USD", value: "USD", symbol: "$", sign_location: "pre" },
  EUR: { name: "EUR", value: "EUR", symbol: "€", sign_location: "post" },
  GEL: { name: "GEL", value: "GEL", symbol: "₾", sign_location: "post" },
  GBP: { name: "GBP", value: "GBP", symbol: "£", sign_location: "pre" },
  VND: { name: "VND", value: "VND", symbol: "₫", sign_location: "pre" },
  BRL: { name: "BRL", value: "BRL", symbol: "R$", sign_location: "pre" },
  PLN: { name: "PLN", value: "PLN", symbol: "zl", sign_location: "pre" },
  HUF: { name: "HUF", value: "HUF", symbol: "Ft", sign_location: "pre" },
  IDR: { name: "IDR", value: "IDR", symbol: "Rp", sign_location: "pre" },
  ZAR: { name: "ZAR", value: "ZAR", symbol: "R", sign_location: "pre" },
};
