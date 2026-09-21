import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../types/internal/user/Role'
import { getCurrentDateMinusDaysAsString } from '../../../../utils/DateUtils'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedCaseLoadCheckScenarios,
  deniedReleasedPrisonerCheckScenarios,
  deniedRestrictedPatientCheckScenarios,
  deniedTransferringPrisonerCheckScenarios,
  grantedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedRestrictedPatientCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../../baseCheck/BaseCheckScenarios'

const today = Date.now()
const recently = getCurrentDateMinusDaysAsString(today, 20)
const longAgo = getCurrentDateMinusDaysAsString(today, 32)

const deniedAfterTransferScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.Prison, Role.DpsApplicationDeveloper])
    .accessingPrisonerAtAfterTransferFrom('LEI', 'MDI', longAgo)
    .expectsStatus(PermissionCheckStatus.NOT_PERMITTED),
])
const grantedAfterTransferScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.Prison, Role.DpsApplicationDeveloper])
    .accessingPrisonerAtAfterTransferFrom('LEI', 'MDI', recently)
    .expectsStatus(PermissionCheckStatus.OK),
])

const deniedScenarios = deniedAfterTransferScenarios
  .and(grantedAfterTransferScenarios.withUserRoles([Role.Prison]))
  .and(
    deniedCaseLoadCheckScenarios
      .withUserRoles([Role.Prison, Role.DpsApplicationDeveloper])
      .withExpectedStatus(PermissionCheckStatus.NOT_PERMITTED),
  )
  .and(deniedRestrictedPatientCheckScenarios.withUserRoles([Role.Prison, Role.DpsApplicationDeveloper]))
  .and(deniedReleasedPrisonerCheckScenarios.withUserRoles([Role.Prison, Role.DpsApplicationDeveloper]))
  .and(deniedTransferringPrisonerCheckScenarios.withUserRoles([Role.Prison, Role.DpsApplicationDeveloper]))
  .and(grantedBaseCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(
    grantedBaseCheckScenarios.withUserRoles([Role.Prison]).withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )
  .and(deniedAfterTransferScenarios)

const grantedScenarios = grantedAfterTransferScenarios
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedRestrictedPatientCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  .withUserRoles([Role.Prison, Role.DpsApplicationDeveloper])
  .and(
    grantedTransferringPrisonerCheckScenarios.withUserRoles([
      Role.Prison,
      Role.InactiveBookings,
      Role.DpsApplicationDeveloper,
    ]),
  )
  .and(grantedAfterTransferScenarios)

// eslint-disable-next-line import/prefer-default-export
export const xrbsReadAndEditScenarios = deniedScenarios.and(grantedScenarios)
