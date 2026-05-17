import { z } from "zod";

export const dcaControlsSchema = z
  .object({
    assetId: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    interval: z.enum(["1", "7", "30"]),
    investmentAmount: z.number().positive(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start > today) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date cannot be in the future",
      });
    }

    if (end > today) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "End date cannot be in the future",
      });
    }

    if (start >= end) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date must be before end date",
      });
    }

    const diffDays =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffDays > 365) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "Date range cannot exceed 365 days",
      });
    }
  });

export type DCAControlsFormValues =
  z.infer<typeof dcaControlsSchema>;