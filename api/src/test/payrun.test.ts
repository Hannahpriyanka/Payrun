import { describe, it, expect } from "vitest";
import { calculatePayslip } from "../server"; // from server.ts since it's inline now

describe("Payslip Calculation", () => {
  it("should compute gross, tax, super, net correctly", () => {
    const employee = {
      id: 1,
      name: "Alice Johnson",
      hourlyRate: 25,
    };

    const timesheet = {
      id: 1,
      employeeId: 1,
      hoursWorked: 45, // includes 7 overtime hours
      date: "2025-08-15",
    };

    const payslip = calculatePayslip(employee, timesheet);

    // Manual calc:
    // Normal: 38 * 25 = 950
    // Overtime: 7 * 25 * 1.5 = 262.5
    // Gross = 1212.5
    // Tax = 1212.5 * 0.07 = 84.875
    // Super = 1212.5 * 0.115 = 139.4375
    // Net = 1212.5 - 84.875 = 1127.625

    expect(payslip.gross).toBeCloseTo(1212.5, 2);
    expect(payslip.tax).toBeCloseTo(84.875, 2);
    expect(payslip.super).toBeCloseTo(139.4375, 2);
    expect(payslip.net).toBeCloseTo(1127.625, 2);
  });
});
