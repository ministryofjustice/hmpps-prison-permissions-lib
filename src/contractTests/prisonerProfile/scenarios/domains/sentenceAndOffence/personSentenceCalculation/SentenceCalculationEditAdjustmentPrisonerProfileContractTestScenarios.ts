import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import {
  deniedBaseCheckScenarios,
  grantedBaseCheckScenarios,
} from '../../../baseCheck/BaseCheckPrisonerProfileContractTestScenarios'
import { Role } from '../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

const deniedSentenceCalculationEditAdjustmentScenarios: TestScenarios = grantedBaseCheckScenarios
  .withoutUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(deniedBaseCheckScenarios.withUserRoles([Role.ReleaseDatesCalculator]))

const grantedSentenceCalculationEditAdjustmentScenarios = grantedBaseCheckScenarios
  .withUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.OK)

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationEditAdjustmentPrisonerProfileScenarios =
  grantedSentenceCalculationEditAdjustmentScenarios.and(deniedSentenceCalculationEditAdjustmentScenarios)
