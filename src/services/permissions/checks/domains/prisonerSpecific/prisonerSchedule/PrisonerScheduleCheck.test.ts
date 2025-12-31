import { PrisonerSchedulePermission } from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerSchedule/PrisonerSchedulePermissions'
import { scenarioTests } from '../../../../../../testUtils/TestScenario'
import { prisonerAppointmentEditScenarios } from './prisonerAppointmentEdit/PrisonerAppointmentEditScenarios'
import { prisonerActivityEditScenarios } from './prisonerActivityEdit/PrisonerActivityEditScenarios'
import { inUsersCaseLoadScenarios } from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoadScenarios'

describe('Prisoner Schedule', () => {
  scenarioTests<PrisonerSchedulePermission>({
    [PrisonerSchedulePermission.read_schedule]: inUsersCaseLoadScenarios,
    [PrisonerSchedulePermission.edit_appointment]: prisonerAppointmentEditScenarios,
    [PrisonerSchedulePermission.edit_activity]: prisonerActivityEditScenarios,
  })
})
