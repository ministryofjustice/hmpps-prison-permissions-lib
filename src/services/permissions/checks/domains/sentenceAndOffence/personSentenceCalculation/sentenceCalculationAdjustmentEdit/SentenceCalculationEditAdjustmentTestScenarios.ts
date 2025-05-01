import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../../baseCheck/BaseCheckTestScenarios'

const deniedSentenceCalculationEditAdjustmentScenarios: TestScenarios = grantedBaseCheckScenarios
  .withoutUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(deniedBaseCheckScenarios.withUserRoles([Role.ReleaseDatesCalculator]))

const grantedSentenceCalculationEditAdjustmentScenarios = grantedBaseCheckScenarios
  .withUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.OK)

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationEditAdjustmentScenarios = grantedSentenceCalculationEditAdjustmentScenarios.and(
  deniedSentenceCalculationEditAdjustmentScenarios,
)
