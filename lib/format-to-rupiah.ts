export default function FormatToRupiah(amount: number | string): string {
  if (typeof amount === "string") {
    amount = parseInt(amount);
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}