import { Router } from "express";

const router = Router();

const employees = [
  { id: "E001", name: "Alice Johnson", hourlyRate: 25 },
  { id: "E002", name: "Bob Smith", hourlyRate: 30 },
  { id: "E003", name: "Charlie Brown", hourlyRate: 28 },
];

router.get("/", (req, res) => {
  res.json(employees);
});

export default router;
