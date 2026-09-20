const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  // NB: 'numeric' for day or month always produces leading zeroes so might as well make it explicit
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Europe/London',
})

export function getCurrentDateMinusDaysAsString(currentDateInMs: number, daysToSubtract: number): string {
  const date = new Date(currentDateInMs - daysToMilliseconds(daysToSubtract))
  // NB: cannot simply `date.toISOString().split('T')[0]` because that returns the UTC date
  const parts = Object.fromEntries(shortDateFormatter.formatToParts(date).map(part => [part.type, part.value]))
  return `${parts.year}-${parts.month}-${parts.day}`
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
