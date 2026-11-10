import { describe, expect, it } from "vitest";

import { generateInvestmentSchedule } from "./generate-investment-schedule";

const DAY = 24 * 60 * 60 * 1000;
const START = Date.UTC(2024, 0, 1);

describe("generateInvestmentSchedule", () => {
  it("membuat jadwal harian termasuk hari awal dan akhir", () => {
    const schedule = generateInvestmentSchedule(START, START + 4 * DAY, 1);

    expect(schedule).toHaveLength(5);
    expect(schedule[0]).toBe(START);
    expect(schedule[4]).toBe(START + 4 * DAY);
  });

  it("membuat jadwal mingguan dengan jarak 7 hari", () => {
    const schedule = generateInvestmentSchedule(START, START + 21 * DAY, 7);

    expect(schedule).toEqual([
      START,
      START + 7 * DAY,
      START + 14 * DAY,
      START + 21 * DAY,
    ]);
  });

  it("tidak melewati batas akhir jika tidak pas kelipatan interval", () => {
    const schedule = generateInvestmentSchedule(START, START + 20 * DAY, 7);

    expect(schedule).toEqual([START, START + 7 * DAY, START + 14 * DAY]);
  });

  it("menghasilkan satu pembelian jika awal = akhir", () => {
    expect(generateInvestmentSchedule(START, START, 7)).toEqual([START]);
  });

  it("mengembalikan array kosong jika interval tidak valid", () => {
    expect(generateInvestmentSchedule(START, START + 5 * DAY, 0)).toEqual([]);
    expect(generateInvestmentSchedule(START, START + 5 * DAY, -1)).toEqual([]);
  });

  it("mengembalikan array kosong jika akhir lebih awal dari awal", () => {
    expect(generateInvestmentSchedule(START + DAY, START, 1)).toEqual([]);
  });
});
