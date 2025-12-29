import PrisonerPermissionsContext from '../../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerPermission } from '../../../../../../../types/public/permissions/prisoner/PrisonerPermissions'

export default function socReadCheck(permission: PrisonerPermission, context: PrisonerPermissionsContext) {
  return baseCheckAndUserHasSomeRolesFrom([Role.SocCommunity, Role.SocCustody])(permission, context)
}
