import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("API Tests", () => {
  it("should return payslips", async () => {
    const res = await request(app)
      .post("/payruns")
      .send({
        employees: [{ id: 1, hourlyRate: 20 }],
        timesheets: [{ employeeId: 1, entries: [{ start: "2024-05-01T09:00:00Z", end: "2024-05-01T17:00:00Z" }] }],
      });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
