import { describe, expect, it } from "vitest";

import { findNearestPrice } from "./find-nearest-price";

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.UTC(2024, 0, 1);

const data = [
  { timestamp: T0, price: 100 },
  { timestamp: T0 + DAY, price: 110 },
  { timestamp: T0 + 2 * DAY, price: 120 },
];

describe("findNearestPrice", () => {
  it("mengembalikan titik dengan timestamp yang sama persis", () => {
    expect(findNearestPrice(data, T0 + DAY)).toEqual(data[1]);
  });

  it("memilih titik terdekat jika tidak ada yang sama persis", () => {
    expect(findNearestPrice(data, T0 + DAY + 1000)).toEqual(data[1]);
    expect(findNearestPrice(data, T0 + 2 * DAY - 1000)).toEqual(data[2]);
  });

  it("memilih titik pertama jika target sebelum seluruh data", () => {
    expect(findNearestPrice(data, T0 - 10 * DAY)).toEqual(data[0]);
  });

  it("memilih titik terakhir jika target setelah seluruh data", () => {
    expect(findNearestPrice(data, T0 + 10 * DAY)).toEqual(data[2]);
  });

  it("mengembalikan null jika data kosong", () => {
    expect(findNearestPrice([], T0)).toBeNull();
  });
});
