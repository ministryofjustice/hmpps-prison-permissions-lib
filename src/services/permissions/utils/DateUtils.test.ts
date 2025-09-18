import { daysToMilliseconds, getCurrentDateMinusDaysAsString, isDateWithinBounds } from './DateUtils'

describe('daysToMilliseconds', () => {
  it.each([
    [0, 0],
    [-1, -86400000],
    [30, 2592000000],
    [0.5, 43200000],
  ])("when number of days input is '%s'", (inputDays, expectedOutputInMs) => {
    expect(daysToMilliseconds(inputDays)).toBe(expectedOutputInMs)
  })
})

describe('getCurrentDateMinusDaysAsString', () => {
  it.each([
    [1735689600000, 1, '2024-12-31'],
    [1735689600000, 0, '2025-01-01'],
    [1735689600000, 30, '2024-12-02'],
    [1735689600000, -1, '2025-01-02'],
    [1735689600000, 0.5, '2024-12-31'],
  ])("when current date is '%s' and days to subtract is '%s'", (currentDateInMs, daysToSubtract, expectedOutput) => {
    expect(getCurrentDateMinusDaysAsString(currentDateInMs, daysToSubtract)).toBe(expectedOutput)
  })
})

describe('isDateWithinBounds', () => {
  it.each([
    [1735689600000, 1735776000000, 1735603200000, true], // 2025-01-01, 2025-01-02, 2024-12-31
    [1735689600000, 1735689600000, 1735603200000, true], // 2025-01-01, 2025-01-01, 2024-12-31
    [1735689600000, 1735776000000, 1735689600000, true], // 2025-01-01, 2025-01-02, 2025-01-01
    [1735776000000, 1735776000000, 1735603200000, true], // 2025-01-02, 2025-01-02, 2024-12-31
    [1735516800000, 1735776000000, 1735603200000, false], // 2024-12-30, 2025-01-02, 2024-12-31
    [1735776000000, 1735689600000, 1735603200000, false], // 2025-01-02,, 2025-01-01, 2024-12-31
    [0, -1, 1, false],
    [-1, -1, -2, true],
  ])(
    "when date to check is '%s', upper bound is '%s' and lower bound is '%s'",
    (dateToCheckInMs, upperBoundInMs, lowerBoundInMs, expectedResult) => {
      expect(isDateWithinBounds(dateToCheckInMs, upperBoundInMs, lowerBoundInMs)).toBe(expectedResult)
    },
  )
})
