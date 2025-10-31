import { describe, it, expect } from "vitest";
import { calculateTax } from "../domain/tax.js";

describe("Tax Calculation", () => {
  it("should return 0 for <=370", () => {
    expect(calculateTax(370)).toBe(0);
  });
  it("should calculate progressive tax", () => {
    expect(calculateTax(1325)).toBeGreaterThan(0);
  });
});
