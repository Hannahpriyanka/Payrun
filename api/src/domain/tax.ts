export function calculateTax(gross: number): number {
  if (gross <= 370) return 0;
  if (gross <= 900) return (gross - 370) * 0.1;
  if (gross <= 1500) return (900 - 370) * 0.1 + (gross - 900) * 0.19;
  if (gross <= 3000) return (900 - 370) * 0.1 + (1500 - 900) * 0.19 + (gross - 1500) * 0.325;
  if (gross <= 5000)
    return (
      (900 - 370) * 0.1 +
      (1500 - 900) * 0.19 +
      (3000 - 1500) * 0.325 +
      (gross - 3000) * 0.37
    );
  return (
    (900 - 370) * 0.1 +
    (1500 - 900) * 0.19 +
    (3000 - 1500) * 0.325 +
    (5000 - 3000) * 0.37 +
    (gross - 5000) * 0.45
  );
}
