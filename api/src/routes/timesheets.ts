import express from "express";
import { prisma } from "../lib/db.js";
import { z } from "zod";

const router = express.Router();

const TimesheetSchema = z.object({
  employeeId: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  allowances: z.number().default(0),
  entries: z.array(
    z.object({
      date: z.string(),
      start: z.string(),
      end: z.string(),
      unpaidBreakMins: z.number()
    })
  )
});

router.post("/", async (req, res) => {
  const parsed = TimesheetSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const data = parsed.data;
  const result = await prisma.timesheet.create({
    data: {
      employeeId: data.employeeId,
      periodStart: new Date(data.periodStart),
      periodEnd: new Date(data.periodEnd),
      allowances: data.allowances,
      entries: JSON.stringify(data.entries) // convert to string
    }
  });

  res.status(201).json(result);
});

router.get("/", async (_, res) => {
  const all = await prisma.timesheet.findMany();
  const parsed = all.map(t => ({
    ...t,
    entries: JSON.parse(t.entries) // parse back to array
  }));
  res.json(parsed);
});

export default router;
