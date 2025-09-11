// ✅ Convert rupees to paise (for DB storage)
export function rupeeToPaise(amountInRupees: number): number {
  return Math.round(amountInRupees * 100);
}

// ✅ Convert paise back to rupees (for display)
export function paiseToRupee(amountInPaise: number): number {
  return amountInPaise / 100;
}
