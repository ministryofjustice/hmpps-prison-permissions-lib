import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/user/Role'
import { PathfinderPermission } from '../../../../../../../types/permissions/domains/security/pathfinder/PathfinderPermissions'

export default function pathfinderReadCheck(request: PermissionsCheckRequest) {
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
