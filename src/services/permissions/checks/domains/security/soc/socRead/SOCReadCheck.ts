import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/user/Role'
import { SOCPermission } from '../../../../../../../types/permissions/domains/security/soc/SOCPermissions'

export default function socReadCheck(request: PermissionsCheckRequest) {
  return baseCheckAndUserHasSomeRolesFrom([Role.SocCommunity, Role.SocCustody], SOCPermission.read, request)
}
