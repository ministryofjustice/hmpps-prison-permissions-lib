import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { SOCPermission } from '../../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'

export default function socEditCheck(request: PermissionsCheckContext) {
  return baseCheckAndUserHasSomeRolesFrom(
    [Role.SocCustody, Role.SocCommunity, Role.SocDataAnalyst, Role.SocDataManager],
    SOCPermission.edit,
    request,
  )
}
