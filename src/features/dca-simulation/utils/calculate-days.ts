export const calculateDaysBetween =
  (
    startDate: string,
    endDate: string
  ) => {
    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const diff =
      end.getTime() -
      start.getTime();

    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );
  };