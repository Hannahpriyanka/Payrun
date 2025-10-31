import express from "express";
import { prisma } from "../lib/db";

const router = express.Router();

// GET all payruns
router.get("/", async (req, res) => {
  try {
    const payruns = await prisma.payrun.findMany({
      include: { payslips: true },
      orderBy: { id: "desc" },
    });
    res.json(payruns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payruns" });
  }
});

// POST to generate a new payrun
router.post("/", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    const timesheets = await prisma.timesheet.findMany();

    if (employees.length === 0 || timesheets.length === 0) {
      return res
        .status(400)
        .json({ error: "No employees or timesheets found." });
    }

    let totalGross = 0,
      totalTax = 0,
      totalSuper = 0,
      totalNet = 0;

    const payslips = [];

    for (const e of employees) {
      const ts = timesheets.find((t) => t.employeeId === e.id);
      if (!ts) continue;

      const normalHours = Math.min(ts.hoursWorked, 38);
      const overtimeHours = Math.max(ts.hoursWorked - 38, 0);
      const gross =
        normalHours * e.hourlyRate + overtimeHours * e.hourlyRate * 1.5;
      const tax =
        gross <= 370
          ? 0
          : gross <= 900
          ? (gross - 370) * 0.1
          : gross <= 1500
          ? 53 + (gross - 900) * 0.19
          : gross <= 3000
          ? 167 + (gross - 1500) * 0.325
          : gross <= 5000
          ? 655 + (gross - 3000) * 0.37
          : 1395 + (gross - 5000) * 0.45;
      const superAmt = gross * 0.115;
      const net = gross - tax;

      totalGross += gross;
      totalTax += tax;
      totalSuper += superAmt;
      totalNet += net;

      payslips.push({
        employeeId: e.id,
        employeeName: e.name,
        normalHours,
        overtimeHours,
        gross,
        tax,
        super: superAmt,
        net,
      });
    }

    const newPayrun = await prisma.payrun.create({
      data: {
        totalsGross: totalGross,
        totalsTax: totalTax,
        totalsSuper: totalSuper,
        totalsNet: totalNet,
        payslips: {
          createMany: {
            data: payslips,
          },
        },
      },
      include: { payslips: true },
    });

    res.status(201).json(newPayrun);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate payrun" });
  }
});

export default router;
