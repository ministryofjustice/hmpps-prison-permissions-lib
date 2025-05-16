import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { SOCPermission } from '../../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'

export default function socReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom([Role.SocCommunity, Role.SocCustody], SOCPermission.read, request)
}
