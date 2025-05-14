import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PathfinderPermission } from '../../../../../../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'

export default function pathfinderEditCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom(
    [
      Role.PathfinderApproval,
      Role.PathfinderStdPrison,
      Role.PathfinderStdProbation,
      Role.PathfinderHQ,
      Role.PathfinderUser,
    ],
    PathfinderPermission.edit,
    request,
  )
}
