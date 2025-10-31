import express from "express";

const router = express.Router();

// Sample in-memory employees data (you can replace with DB later)
const employees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", hourlyRate: 25 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", hourlyRate: 30 },
];

// GET /api/employees
router.get("/", (req, res) => {
  res.json(employees);
});

export default router;
