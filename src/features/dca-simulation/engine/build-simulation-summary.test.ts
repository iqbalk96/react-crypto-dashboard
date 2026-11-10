import { describe, expect, it } from "vitest";

import { buildSimulationSummary } from "./build-simulation-summary";
import { calculateInvestmentEvent } from "./calculate-investment-event";

describe("buildSimulationSummary", () => {
  // Harga: 100, 200, 50, 100 dengan nominal $100 per pembelian
  //   unit : 1 + 0.5 + 2 + 1 = 4.5
  //   total: $400, harga terakhir $100
  const events = [100, 200, 50, 100].map((price, i) =>
    calculateInvestmentEvent(i, price, 100),
  );

  it("menghitung seluruh metrik dengan benar", () => {
    const s = buildSimulationSummary(events, 100);

    expect(s.totalInvested).toBe(400);
    expect(s.totalUnitsAccumulated).toBeCloseTo(4.5, 10);
    expect(s.currentValue).toBeCloseTo(450, 10);
    expect(s.totalReturn).toBeCloseTo(50, 10);
    expect(s.totalReturnPercentage).toBeCloseTo(12.5, 10);
    expect(s.totalPurchases).toBe(4);
  });

  it("harga beli rata-rata adalah harmonic mean, bukan rata-rata harga", () => {
    const s = buildSimulationSummary(events, 100);

    // 400 / 4.5 = 88.888...  (rata-rata aritmatika harga = 112.5)
    expect(s.averageBuyPrice).toBeCloseTo(88.8889, 4);
  });

  it("menghitung selisih harga beli rata-rata terhadap harga sekarang", () => {
    const s = buildSimulationSummary(events, 100);

    // (88.8889 - 100) / 100 * 100 = -11.11%
    expect(s.averageBuyVsCurrent).toBeCloseTo(-11.1111, 3);
  });

  it("menghasilkan return negatif saat harga akhir di bawah rata-rata beli", () => {
    const s = buildSimulationSummary(events, 50);

    expect(s.currentValue).toBeCloseTo(225, 10);
    expect(s.totalReturn).toBeCloseTo(-175, 10);
    expect(s.totalReturnPercentage).toBeCloseTo(-43.75, 10);
  });

  it("aman untuk daftar event kosong (tanpa NaN/Infinity)", () => {
    const s = buildSimulationSummary([], 0);

    expect(s).toEqual({
      totalInvested: 0,
      currentValue: 0,
      totalReturn: 0,
      totalReturnPercentage: 0,
      totalUnitsAccumulated: 0,
      averageBuyPrice: 0,
      totalPurchases: 0,
      averageBuyVsCurrent: 0,
    });
  });

  it("averageBuyVsCurrent = 0 jika harga terakhir 0", () => {
    const s = buildSimulationSummary(events, 0);

    expect(s.averageBuyVsCurrent).toBe(0);
    expect(Number.isFinite(s.currentValue)).toBe(true);
  });
});
