import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../../baseCheck/BaseCheckTestScenarios'

const deniedSentenceCalculationReadScenarios: TestScenarios = grantedBaseCheckScenarios
  .withoutUserRoles([Role.ReleaseDatesCalculator])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(deniedBaseCheckScenarios.withUserRoles([Role.ReleaseDatesCalculator]))

const grantedSentenceCalculationReadScenarios = grantedBaseCheckScenarios
  .withUserRoles([Role.ReleaseDatesCalculator])
  .withExpectedStatus(PermissionCheckStatus.OK)

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationReadScenarios = grantedSentenceCalculationReadScenarios.and(
  deniedSentenceCalculationReadScenarios,
)
