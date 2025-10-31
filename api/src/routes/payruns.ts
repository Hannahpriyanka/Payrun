import express from "express";
import { calculatePay } from "../domain/calc";

const router = express.Router();

// ✅ GET test route
router.get("/", (req, res) => {
  res.send("✅ Payrun routes are active!");
});

// ✅ POST payrun calculation
router.post("/", (req, res) => {
  const employees = req.body; // expects array
  const results = employees.map((emp: any) => {
    const { grossPay, tax, netPay } = calculatePay(emp.hoursWorked, emp.hourlyRate);
    return {
      employeeId: emp.employeeId,
      grossPay,
      tax,
      netPay,
    };
  });
  res.json(results);
});

export default router;
