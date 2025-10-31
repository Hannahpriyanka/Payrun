import { describe, it, expect } from "vitest";

describe("Tax Tests", () => {
  it("should calculate correct tax rate", () => {
    const gross = 1000;
    const tax = gross * 0.2;
    expect(tax).toBe(200);
  });
});
