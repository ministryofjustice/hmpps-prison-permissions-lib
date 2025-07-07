import { Role } from '../../../../../types/internal/user/Role'
import { TestScenarios } from '../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedCaseLoadCheckScenarios,
  grantedGlobalSearchCheckScenarios,
  grantedReleasedPrisonerCheckScenarios,
  grantedTransferringPrisonerCheckScenarios,
} from '../../baseCheck/BaseCheckScenarios'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'

const deniedScenarios: TestScenarios = deniedBaseCheckScenarios
  // These granted base check scenarios should be denied because the user must have the prisoner in case load:
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  .and(
    grantedTransferringPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  .and(
    grantedReleasedPrisonerCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  .and(
    grantedGlobalSearchCheckScenarios
      .withUserRole(Role.PrisonerProfileSensitiveEdit)
      .withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  // These scenarios should be denied because the user must have the required role:
  .and(
    grantedCaseLoadCheckScenarios
      .withoutUserRoles([Role.PrisonerProfileSensitiveEdit])
      .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )

const grantedScenarios = grantedCaseLoadCheckScenarios.withUserRole(Role.PrisonerProfileSensitiveEdit)

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileSensitiveEditCheckScenarios = grantedScenarios.and(deniedScenarios)
