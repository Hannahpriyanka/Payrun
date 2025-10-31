import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server";

describe("Mini Payrun API", () => {
  it("should fetch employees", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
