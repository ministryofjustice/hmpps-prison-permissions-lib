export function getCurrentDateMinusDaysAsString(currentDateInMs: number, daysToSubtract: number): string {
  return new Date(currentDateInMs - daysToMilliseconds(daysToSubtract)).toISOString().split('T')[0]
}

export function daysToMilliseconds(days: number): number {
  return days * 24 * 60 * 60 * 1000
}

export function isDateWithinBounds(
  dateToCheckInMs: number,
  upperDateBoundInMs: number,
  lowerDateBoundInMs: number,
): boolean {
  return dateToCheckInMs <= upperDateBoundInMs && lowerDateBoundInMs <= dateToCheckInMs
}
