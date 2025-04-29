import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'
import { scenarioTest } from '../../testUtils/TestScenario'
import { PersonCourtSchedulesPermission } from '../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { baseCheckPrisonerProfileScenarios } from './scenarios/baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { courtScheduleReadPrisonerProfileScenarios } from './scenarios/domains/courtAndLegal/personCourtSchedules/CourtScheduleReadPrisonerProfileContractTestScenarios'

describe('Prisoner Profile Contract Tests', () => {
  describe('Base check', () => {
    scenarioTest(baseCheckPrisonerProfileScenarios, PrisonerBasePermission.read)
  })

  describe('Domains', () => {
    describe('Court / Legal', () => {
      describe('Person Court Schedules', () => {
        scenarioTest(courtScheduleReadPrisonerProfileScenarios, PersonCourtSchedulesPermission.read_schedule)
      })
    })
  })
})
