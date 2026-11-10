import { z } from "zod";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

const MAX_RANGE_DAYS = 365;
const MAX_HISTORY_DAYS = 365;

export const dcaControlsSchema = z
  .object({
    assetId: z.string().min(1, "Select an asset"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    interval: z.enum(["1", "7", "30"]),
    investmentAmount: z.coerce
      .number({ message: "Enter a valid amount" })
      .positive("Investment amount must be greater than 0"),
  })
  .superRefine((data, ctx) => {
    // Tanggal berformat "yyyy-MM-dd" sehingga bisa dibandingkan sebagai string
    // dan dihitung selisihnya per hari kalender (tanpa pengaruh timezone/DST).
    if (!data.startDate || !data.endDate) return;

    const today = format(new Date(), "yyyy-MM-dd");

    if (data.startDate > today) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date cannot be in the future",
      });
    }

    if (data.endDate > today) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "End date cannot be in the future",
      });
    }

    if (data.startDate >= data.endDate) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date must be before end date",
      });
      return;
    }

    const diffDays = differenceInCalendarDays(
      parseISO(data.endDate),
      parseISO(data.startDate),
    );

    // CoinGecko (plan gratis) hanya melayani data historis 365 hari terakhir,
    // dihitung dari tanggal UTC hari ini.
    const todayUtc = new Date().toISOString().slice(0, 10);
    const startAgeDays = differenceInCalendarDays(
      parseISO(todayUtc),
      parseISO(data.startDate),
    );

    if (startAgeDays > MAX_HISTORY_DAYS) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: `Start date is too old. Free data only covers the last ${MAX_HISTORY_DAYS} days`,
      });
    }

    if (diffDays > MAX_RANGE_DAYS) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: `Date range cannot exceed ${MAX_RANGE_DAYS} days`,
      });
    }
  });

// Nilai mentah di form (investmentAmount bisa berupa string/kosong sebelum di-coerce)
export type DCAControlsFormInput = z.input<typeof dcaControlsSchema>;

// Nilai valid setelah lolos validasi
export type DCAControlsFormValues = z.output<typeof dcaControlsSchema>;
