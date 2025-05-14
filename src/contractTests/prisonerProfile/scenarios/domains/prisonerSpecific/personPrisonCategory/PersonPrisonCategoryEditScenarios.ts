import { TestScenarios } from '../../../../../../testUtils/TestScenario'
import { deniedBaseCheckScenarios, grantedBaseCheckScenarios } from '../../../baseCheck/BaseCheckScenarios'
import { Role } from '../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../types/internal/permissions/PermissionCheckStatus'

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
