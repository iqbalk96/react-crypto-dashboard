import { describe, expect, it } from "vitest";

import { calculateInvestmentEvent } from "./calculate-investment-event";

describe("calculateInvestmentEvent", () => {
  it("menghitung unit = nominal / harga", () => {
    const event = calculateInvestmentEvent(1000, 50_000, 100);

    expect(event).toEqual({
      timestamp: 1000,
      price: 50_000,
      amountInvested: 100,
      unitsBought: 0.002,
    });
  });

  it("harga murah menghasilkan unit lebih banyak", () => {
    const cheap = calculateInvestmentEvent(1, 10, 100);
    const expensive = calculateInvestmentEvent(1, 100, 100);

    expect(cheap.unitsBought).toBe(10);
    expect(expensive.unitsBought).toBe(1);
  });

  it("unit = 0 jika harga 0 (tidak membagi dengan nol)", () => {
    expect(calculateInvestmentEvent(1, 0, 100).unitsBought).toBe(0);
  });
});
