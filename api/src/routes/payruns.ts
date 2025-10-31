import express from "express";

const router = express.Router();

// Temporary in-memory stores
let payruns: any[] = [];
let employees: any[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", hourlyRate: 25 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", hourlyRate: 30 },
];
let timesheets: any[] = [
  { employeeId: 1, hoursWorked: 37, allowances: 30 },
  { employeeId: 2, hoursWorked: 45, allowances: 0 },
];

// --- Calculation Helpers ---

function calculateGross(hoursWorked: number, baseRate: number, allowances: number) {
  const normalHours = Math.min(38, hoursWorked);
  const overtimeHours = Math.max(0, hoursWorked - 38);
  const gross = normalHours * baseRate + overtimeHours * baseRate * 1.5 + allowances;
  return { gross, normalHours, overtimeHours };
}

function calculateTax(gross: number) {
  if (gross <= 370) return 0;
  if (gross <= 900) return (gross - 370) * 0.1;
  if (gross <= 1500) return 53 + (gross - 900) * 0.19;
  if (gross <= 3000) return 53 + 114 + (gross - 1500) * 0.325;
  if (gross <= 5000) return 53 + 114 + 487.5 + (gross - 3000) * 0.37;
  return 53 + 114 + 487.5 + 740 + (gross - 5000) * 0.45;
}

function calculateSuper(gross: number) {
  return gross * 0.115;
}

// --- POST /api/payruns ---
router.post("/", (req, res) => {
  const { startDate, endDate } = req.body;
  if (!startDate || !endDate)
    return res.status(400).json({ error: "startDate and endDate required" });

  const payslips = timesheets.map((t) => {
    const emp = employees.find((e) => e.id === t.employeeId);
    if (!emp) return null;

    const { gross, normalHours, overtimeHours } = calculateGross(
      t.hoursWorked,
      emp.hourlyRate,
      t.allowances || 0
    );
    const tax = calculateTax(gross);
    const superAmt = calculateSuper(gross);
    const net = gross - tax;

    return {
      employeeId: emp.id,
      employeeName: emp.name,
      normalHours,
      overtimeHours,
      gross,
      tax,
      super: superAmt,
      net,
    };
  }).filter(Boolean);

  const totals = payslips.reduce(
    (acc, p) => {
      acc.gross += p.gross;
      acc.tax += p.tax;
      acc.super += p.super;
      acc.net += p.net;
      return acc;
    },
    { gross: 0, tax: 0, super: 0, net: 0 }
  );

  const payrun = {
    id: payruns.length + 1,
    startDate,
    endDate,
    totals,
    payslips,
  };

  payruns.push(payrun);
  res.status(201).json(payrun);
});

// --- GET /api/payruns ---
router.get("/", (req, res) => {
  res.json(payruns);
});

export default router;
