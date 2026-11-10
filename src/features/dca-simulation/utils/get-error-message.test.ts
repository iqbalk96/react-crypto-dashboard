import { describe, expect, it } from "vitest";
import { AxiosError } from "axios";

import { getErrorMessage } from "./get-error-message";

const axiosError = (status?: number, code?: string) => {
  const error = new AxiosError("fail", code);
  if (status !== undefined) {
    error.response = {
      status,
      statusText: "",
      headers: {},
      data: {},
      config: {} as never,
    };
  }
  return error;
};

describe("getErrorMessage", () => {
  it("401 & 403 → batas data plan gratis", () => {
    expect(getErrorMessage(axiosError(401))).toMatch(/365 days/);
    expect(getErrorMessage(axiosError(403))).toMatch(/365 days/);
  });

  it("429 → rate limit", () => {
    expect(getErrorMessage(axiosError(429))).toMatch(/too many requests/i);
  });

  it("404 → data tidak ditemukan", () => {
    expect(getErrorMessage(axiosError(404))).toMatch(/not found/i);
  });

  it("timeout", () => {
    expect(getErrorMessage(axiosError(undefined, "ECONNABORTED"))).toMatch(
      /timed out/i,
    );
  });

  it("tanpa respons → error jaringan", () => {
    expect(getErrorMessage(axiosError())).toMatch(/network/i);
  });

  it("status lain menyertakan kode HTTP", () => {
    expect(getErrorMessage(axiosError(500))).toContain("500");
  });

  it("Error biasa → memakai message-nya", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("nilai tak dikenal → pesan fallback", () => {
    expect(getErrorMessage("???")).toMatch(/failed to fetch/i);
    expect(getErrorMessage(null)).toMatch(/failed to fetch/i);
  });
});
