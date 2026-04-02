export function formatPrice(amount, currency = "BDT") {
  if (currency === "BDT") {
    return `৳${Number(amount).toLocaleString("en-BD")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
export const currency = formatPrice;
