import express from "express";
const router = express.Router();

const timesheets = [
  { id: "T001", employeeId: "E001", weekEnding: "2025-10-25", hoursWorked: 40 },
  { id: "T002", employeeId: "E002", weekEnding: "2025-10-25", hoursWorked: 38 },
  { id: "T003", employeeId: "E003", weekEnding: "2025-10-25", hoursWorked: 42 },
];

// ✅ GET all timesheets
router.get("/", (req, res) => {
  res.json(timesheets);
});

export default router;
