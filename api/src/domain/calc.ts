export function calculatePay(hoursWorked: number, hourlyRate: number) {
  const grossPay = hoursWorked * hourlyRate;
  const tax = grossPay * 0.2;
  const netPay = grossPay - tax;
  return { grossPay, tax, netPay };
}
