import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function pathfinderEditCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return baseCheckAndUserHasSomeRolesFrom([
    Role.PathfinderApproval,
    Role.PathfinderStdPrison,
    Role.PathfinderStdProbation,
    Role.PathfinderHQ,
    Role.PathfinderUser,
  ])(permission, context)
}
