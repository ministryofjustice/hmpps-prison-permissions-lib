import baseCheckStatus from './BaseCheckStatus'
import { TestScenario } from '../../../../../testUtils/TestScenario'
import { baseCheckScenarios } from '../BaseCheckTestScenarios'

describe('BaseCheck', () => {
  it.each(baseCheckScenarios.toTestArray())(
    `Active caseload: %s | Other caseloads: %s | Roles: %s | Prisoner location: %s | Status: %s`,
    (_activeCaseLoad, _otherCaseLoads, _roles, _prisonerLocation, _status, testScenario) => {
      const scenario = testScenario as TestScenario
      const status = baseCheckStatus(scenario.user, scenario.prisoner)

      expect(status).toEqual(scenario.expectedStatus)
    },
  )
})
