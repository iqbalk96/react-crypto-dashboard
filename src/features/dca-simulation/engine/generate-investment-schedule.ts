const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Membuat daftar timestamp pembelian dari startTimestamp sampai
 * endTimestamp (inklusif), dengan jarak intervalDays hari.
 */
export const generateInvestmentSchedule = (
  startTimestamp: number,
  endTimestamp: number,
  intervalDays: number,
): number[] => {
  if (intervalDays <= 0 || endTimestamp < startTimestamp) return [];

  const step = intervalDays * DAY_MS;
  const schedule: number[] = [];

  for (let ts = startTimestamp; ts <= endTimestamp; ts += step) {
    schedule.push(ts);
  }

  return schedule;
};
