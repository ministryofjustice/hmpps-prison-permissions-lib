import baseCheckStatus from './BaseCheckStatus'
import { TestScenario } from '../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../BaseCheckScenarios'
import { prisonUserMock } from '../../../../../testUtils/UserMocks'
import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { prisonerMock } from '../../../../../testUtils/PrisonerMocks'
import { PermissionStatus } from '../../../../../types/internal/permissions/PermissionStatus'

describe('BaseCheck', () => {
  it.each(['delius', 'external', 'azuread'])('Non prison user: %s fails check', authSource => {
    const status = baseCheckStatus({ ...prisonUserMock, authSource } as HmppsUser, prisonerMock)
    expect(status).toEqual(PermissionStatus.NOT_PRISON_USER)
  })

  it.each(baseCheckScenarios.toTestArray())(
    `Active caseload: %s | Other caseloads: %s | Roles: %s | Prisoner location: %s | Previous Prison location: %s | Date out of previous prison: %s | Status: %s`,
    (
      _activeCaseLoad,
      _otherCaseLoads,
      _roles,
      _prisonerLocation,
      _previousPrisonId,
      _previousPrisonLeavingDate,
      _status,
      testScenario,
    ) => {
      const scenario = testScenario as TestScenario
      const status = baseCheckStatus(scenario.user, scenario.prisoner)

      expect(status).toEqual(scenario.expectedStatus)
    },
  )
})
