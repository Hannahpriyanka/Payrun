import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

// Mock employee data
const employees = [
  { id: 1, name: "Alice Johnson", hourlyRate: 25 },
  { id: 2, name: "Bob Smith", hourlyRate: 30 },
];

// Mock timesheets
const timesheets = [
  { id: 1, employeeId: 1, hoursWorked: 37, date: "2025-08-15" },
  { id: 2, employeeId: 2, hoursWorked: 45, date: "2025-08-15" },
];

// In-memory payruns
let payruns: any[] = [];

/**
 * Calculates payslip for a single employee and timesheet
 */
function calculatePayslip(employee: any, timesheet: any) {
  const normalHours = Math.min(timesheet.hoursWorked, 38);
  const overtimeHours = Math.max(timesheet.hoursWorked - 38, 0);

  const gross =
    normalHours * employee.hourlyRate +
    overtimeHours * employee.hourlyRate * 1.5;

  const tax = gross * 0.07;
  const superannuation = gross * 0.115;
  const net = gross - tax;

  return {
    employeeId: employee.id,
    employeeName: employee.name,
    normalHours,
    overtimeHours,
    gross,
    tax,
    super: superannuation,
    net,
  };
}

/**
 * Generate a payrun for a given date range
 */
app.post("/api/payruns", (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  const payslips = timesheets.map((t) => {
    const emp = employees.find((e) => e.id === t.employeeId);
    return calculatePayslip(emp, t);
  });

  const totals = payslips.reduce(
    (sum, p) => ({
      gross: sum.gross + p.gross,
      tax: sum.tax + p.tax,
      super: sum.super + p.super,
      net: sum.net + p.net,
    }),
    { gross: 0, tax: 0, super: 0, net: 0 }
  );

  const newPayrun = {
    id: payruns.length + 1,
    startDate,
    endDate,
    totals,
    payslips,
  };

  payruns.push(newPayrun);
  res.json(newPayrun);
});

/**
 * Get all payruns
 */
app.get("/api/payruns", (req: Request, res: Response) => {
  res.json(payruns);
});

/**
 * Get employees
 */
app.get("/api/employees", (req: Request, res: Response) => {
  res.json(employees);
});

/**
 * Get timesheets
 */
app.get("/api/timesheets", (req: Request, res: Response) => {
  res.json(timesheets);
});

/**
 * Start server (not during tests)
 */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`🚀 API running on http://localhost:${PORT}`)
  );
}

export default app;
export { calculatePayslip };
