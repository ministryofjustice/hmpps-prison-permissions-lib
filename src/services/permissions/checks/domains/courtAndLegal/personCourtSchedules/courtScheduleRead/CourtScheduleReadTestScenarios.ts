import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { failingBaseCheckScenarios, passingBaseCheckScenarios } from '../../../../baseCheck/BaseCheckTestScenarios'

const failingCourtScheduleReadScenarios: TestScenarios = passingBaseCheckScenarios
  .withoutUserRoles([Role.ReleaseDatesCalculator])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(failingBaseCheckScenarios.withUserRoles([Role.ReleaseDatesCalculator]))

const passingCourtScheduleReadScenarios = passingBaseCheckScenarios
  .withUserRoles([Role.ReleaseDatesCalculator])
  .withExpectedStatus(PermissionCheckStatus.OK)

// eslint-disable-next-line import/prefer-default-export
export const courtScheduleReadScenarios = passingCourtScheduleReadScenarios.and(failingCourtScheduleReadScenarios)
