import baseCheckStatus from './BaseCheckStatus'
import { TestScenario } from '../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../BaseCheckTestScenarios'
import { prisonUserMock } from '../../../../../testUtils/UserMocks'
import { HmppsUser } from '../../../../../types/internal/user/HmppsUser'
import { prisonerMock } from '../../../../../testUtils/PrisonerMocks'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

describe('BaseCheck', () => {
  it.each(['delius', 'external', 'azuread'])('Non prison user: %s fails check', authSource => {
    const status = baseCheckStatus({ ...prisonUserMock, authSource } as HmppsUser, prisonerMock)
    expect(status).toEqual(PermissionCheckStatus.NOT_PRISON_USER)
  })

  it.each(baseCheckScenarios.toTestArray())(
    `Active caseload: %s | Other caseloads: %s | Roles: %s | Prisoner location: %s | Status: %s`,
    (_activeCaseLoad, _otherCaseLoads, _roles, _prisonerLocation, _status, testScenario) => {
      const scenario = testScenario as TestScenario
      const status = baseCheckStatus(scenario.user, scenario.prisoner)

      expect(status).toEqual(scenario.expectedStatus)
    },
  )
})
