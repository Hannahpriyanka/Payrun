import express from "express";
const router = express.Router();

const payslips = [
  {
    id: "P001",
    employeeId: "E001",
    period: "2025-10-25",
    grossPay: 1000,
    tax: 200,
    netPay: 800,
  },
  {
    id: "P002",
    employeeId: "E002",
    period: "2025-10-25",
    grossPay: 1140,
    tax: 228,
    netPay: 912,
  },
];

// ✅ GET all payslips
router.get("/", (req, res) => {
  res.json(payslips);
});

export default router;
