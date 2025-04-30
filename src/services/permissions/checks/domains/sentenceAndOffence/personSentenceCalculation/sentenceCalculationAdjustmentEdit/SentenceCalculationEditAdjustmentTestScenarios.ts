import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../../types/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { failingBaseCheckScenarios, passingBaseCheckScenarios } from '../../../../baseCheck/BaseCheckTestScenarios'

const failingSentenceCalculationEditAdjustmentScenarios: TestScenarios = passingBaseCheckScenarios
  .withoutUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(failingBaseCheckScenarios.withUserRoles([Role.ReleaseDatesCalculator]))

const passingSentenceCalculationEditAdjustmentScenarios = passingBaseCheckScenarios
  .withUserRoles([Role.AdjustmentsMaintainer])
  .withExpectedStatus(PermissionCheckStatus.OK)

// eslint-disable-next-line import/prefer-default-export
export const sentenceCalculationEditAdjustmentScenarios = passingSentenceCalculationEditAdjustmentScenarios.and(
  failingSentenceCalculationEditAdjustmentScenarios,
)
