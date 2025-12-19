import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PathfinderPermission } from '../../../../../../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'

export default function pathfinderReadCheck(request: PermissionsCheckContext) {
  return baseCheckAndUserHasSomeRolesFrom(
    [
      Role.PathfinderApproval,
      Role.PathfinderStdPrison,
      Role.PathfinderStdProbation,
      Role.PathfinderHQ,
      Role.PathfinderUser,
      Role.PathfinderLocalReader,
      Role.PathfinderNationalReader,
      Role.PathfinderPolice,
      Role.PathfinderPsychologist,
    ],
    PathfinderPermission.read,
    request,
  )
}
