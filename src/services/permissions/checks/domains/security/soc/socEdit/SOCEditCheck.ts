import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { SOCPermission } from '../../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'

export default function socEditCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom(
    [Role.SocCustody, Role.SocCommunity, Role.SocDataAnalyst, Role.SocDataManager],
    SOCPermission.edit,
    request,
  )
}
