const RATE_PER_HOUR = Number(process.env.RATE_PER_HOUR) || 50;

exports.RATE_PER_HOUR = RATE_PER_HOUR;

exports.calculateBill = (entryTime, exitTime) => {
  const diffMs = exitTime - entryTime;
  if (diffMs <= 0) return RATE_PER_HOUR;
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  return hours * RATE_PER_HOUR;
};