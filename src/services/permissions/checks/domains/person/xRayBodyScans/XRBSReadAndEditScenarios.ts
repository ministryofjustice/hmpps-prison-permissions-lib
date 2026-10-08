import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../types/internal/user/Role'
import { getCurrentDateMinusDaysAsString } from '../../../../utils/DateUtils'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
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
    .withRoles([Role.Prison, Role.GlobalSearch])
    .accessingPrisonerAtAfterTransferFrom('LEI', 'MDI', longAgo)
    .expectsStatus(PermissionCheckStatus.NOT_PERMITTED),
])
const grantedAfterTransferScenarios = new TestScenarios([
  userWithActiveCaseLoad('MDI')
    .withRoles([Role.Prison, Role.GlobalSearch])
    .accessingPrisonerAtAfterTransferFrom('LEI', 'MDI', recently)
    .expectsStatus(PermissionCheckStatus.OK),
])

const deniedScenarios = new TestScenarios([])
  .and(
    grantedAfterTransferScenarios
      .withoutUserRoles([Role.Prison])
      .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )
  .and(deniedBaseCheckScenarios.withUserRoles([Role.Prison]))
  .and(grantedBaseCheckScenarios.withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT))
  .and(deniedAfterTransferScenarios)

const grantedScenarios = new TestScenarios([])
  .and(grantedCaseLoadCheckScenarios)
  .and(grantedRestrictedPatientCheckScenarios)
  .and(grantedReleasedPrisonerCheckScenarios)
  .and(grantedTransferringPrisonerCheckScenarios)
  .withUserRoles([Role.Prison])
  .and(grantedAfterTransferScenarios)

// eslint-disable-next-line import/prefer-default-export
export const xrbsReadAndEditScenarios = deniedScenarios.and(grantedScenarios)
