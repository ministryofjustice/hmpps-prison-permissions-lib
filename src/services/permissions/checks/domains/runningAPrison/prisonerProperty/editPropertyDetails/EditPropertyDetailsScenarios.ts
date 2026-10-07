import { TestScenarios } from '../../../../../../../testUtils/TestScenario'
import { Role } from '../../../../../../../types/internal/user/Role'
import {
  deniedReadPropertyDetailsScenarios,
  grantedReadPropertyDetailsScenarios,
} from '../readPropertyDetails/ReadPropertyDetailsScenarios'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'

const grantedScenarios: TestScenarios = grantedReadPropertyDetailsScenarios.withUserRole(Role.PrisonerPropertyManage)
const deniedScenarios: TestScenarios = deniedReadPropertyDetailsScenarios
  .withUserRole(Role.PrisonerPropertyManage)
  .and(
    grantedReadPropertyDetailsScenarios
      .withoutUserRoles([Role.PrisonerPropertyManage])
      .withExpectedStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )

// eslint-disable-next-line import/prefer-default-export
export const editPropertyDetailsScenarios = grantedScenarios.and(deniedScenarios)
