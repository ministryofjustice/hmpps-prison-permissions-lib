/** 24/7/2026 12:07:41 Europe/London */
export const now = new Date('2026-07-24T12:07:41+01:00')
/** 24/7/2026 midday Europe/London */
export const today = new Date('2026-07-24T12:00:00+01:00')
/** 23/7/2026 midday Europe/London */
export const yesterday = new Date('2026-07-23T12:00:00+01:00')
/** 1/1/2026 midday Europe/London */
export const startOfYear = new Date('2026-01-01T12:00:00+00:00')

/** Fixes clock during tests so that now is 24/7/2026 12:07:41 Europe/London */
export function fixedClock(fixedNow: Date = now): void {
  jest.useFakeTimers({ now: fixedNow, advanceTimers: true })
  jest.setSystemTime(fixedNow)
}
