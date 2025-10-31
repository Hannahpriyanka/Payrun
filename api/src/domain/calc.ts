import { Timesheet, Employee, Payslip } from "./types";
import { calculateTax } from "./tax.js";

export function calculatePayslip(employee: Employee, timesheet: Timesheet): Payslip {
  const totalMins = timesheet.entries.reduce((sum, e) => {
    const [sh, sm] = e.start.split(":").map(Number);
    const [eh, em] = e.end.split(":").map(Number);
    const duration = (eh * 60 + em) - (sh * 60 + sm) - e.unpaidBreakMins;
    return sum + duration;
  }, 0);

  const totalHours = totalMins / 60;
  const normalHours = Math.min(38, totalHours);
  const overtimeHours = Math.max(0, totalHours - 38);

  const gross =
    normalHours * employee.baseHourlyRate +
    overtimeHours * employee.baseHourlyRate * 1.5 +
    timesheet.allowances;

  const tax = parseFloat(calculateTax(gross).toFixed(2));
  const superVal = parseFloat((gross * employee.superRate).toFixed(2));
  const net = parseFloat((gross - tax).toFixed(2));

  return {
    employeeId: employee.id,
    normalHours,
    overtimeHours,
    gross,
    tax,
    super: superVal,
    net
  };
}
