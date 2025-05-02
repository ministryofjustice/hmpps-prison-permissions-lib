import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../../baseCheck/BaseCheckTestScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { Role } from '../../../../../../../types/user/Role'

const deniedScenarios: TestScenarios = grantedBaseCheckScenarios
  .withoutUserRoles([
    Role.CreateCategorisation,
    Role.CreateRecategorisation,
    Role.ApproveCategorisation,
    Role.CategorisationSecurity,
  ])
  .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  .and(
    deniedBaseCheckScenarios.withUserRoles([
      Role.CreateCategorisation,
      Role.CreateRecategorisation,
      Role.ApproveCategorisation,
      Role.CategorisationSecurity,
    ]),
  )

const grantedScenarios = grantedBaseCheckScenarios
  .withUserRoles([Role.CreateCategorisation])
  .and(grantedBaseCheckScenarios.withUserRoles([Role.CreateRecategorisation]))
  .and(grantedBaseCheckScenarios.withUserRoles([Role.ApproveCategorisation]))
  .and(grantedBaseCheckScenarios.withUserRoles([Role.CategorisationSecurity]))

// eslint-disable-next-line import/prefer-default-export
export const personPrisonCategoryEditScenarios = grantedScenarios.and(deniedScenarios)
