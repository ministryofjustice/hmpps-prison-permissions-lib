import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { SOCPermission } from '../../../../../../../types/public/permissions/domains/security/soc/SOCPermissions'

export default function socReadCheck(request: PermissionsCheckContext) {
  return baseCheckAndUserHasSomeRolesFrom([Role.SocCommunity, Role.SocCustody], SOCPermission.read, request)
}
