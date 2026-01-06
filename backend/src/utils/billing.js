exports.calculateBill = (entryTime, exitTime) => {
  const RATE_PER_HOUR = Number(process.env.RATE_PER_HOUR) || 20;

  const diffMs = exitTime - entryTime;

  if (diffMs <= 0) return RATE_PER_HOUR;

  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  return hours * RATE_PER_HOUR;
};
