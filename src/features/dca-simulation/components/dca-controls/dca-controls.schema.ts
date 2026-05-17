import { z } from "zod";

export const dcaControlsSchema = z
  .object({
    assetId: z.string().min(1),

    startDate: z.string().min(1),

    endDate: z.string().min(1),

    interval: z.enum([
      "1",
      "7",
      "30",
    ]),

    investmentAmount: z
      .number()
      .positive(),
  })
  .refine(
    (data) =>
      new Date(data.startDate) <
      new Date(data.endDate),
    {
      message:
        "End date must be after start date",
      path: ["endDate"],
    }
  );

export type DCAControlsFormValues =
  z.infer<typeof dcaControlsSchema>;