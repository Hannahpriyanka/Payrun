import { describe, it, expect } from "vitest";
import { calculatePayslip } from "../domain/calc.js";
import { Employee, Timesheet } from "../domain/types.js";

describe("Payrun Calculation", () => {
  it("should calculate gross, tax, and net correctly", () => {
    const employee: Employee = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      type: "FULL_TIME",
      baseHourlyRate: 20,
      superRate: 0.1,
    };

    const timesheet: Timesheet = {
      employeeId: "1",
      entries: [{ start: "2024-05-01T09:00:00Z", end: "2024-05-01T17:00:00Z" }],
    };

    const payslip = calculatePayslip(employee, timesheet);
    expect(payslip.gross).toBeGreaterThan(0);
    expect(payslip.tax).toBeGreaterThan(0);
    expect(payslip.net).toBe(payslip.gross - payslip.tax);
    expect(payslip.super).toBeCloseTo(payslip.gross * 0.1);
  });
});
