export function deliveryFee(city: string, subtotal: number) {
  if (subtotal >= 250) return 0;
  return city.toLowerCase() === "dubai" ? 20 : 35;
}
export function installmentSchedule(total: number) {
  const part = Math.round((total / 4) * 100) / 100;
  return [1, 2, 3, 4].map((n) => ({ installment: n, amount: n === 4 ? Math.round((total - part * 3) * 100) / 100 : part, due: n === 1 ? "Today" : `In ${n - 1} month${n > 2 ? "s" : ""}` }));
}
