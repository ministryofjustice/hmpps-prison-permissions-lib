import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import inUsersCaseLoadAndUserHasSomeRolesFrom from '../inUsersCaseLoadAndUserHasSomeRolesFrom/InUsersCaseLoadAndUserHasSomeRolesFrom'

const inUsersCaseLoadAndUserHasRole =
  (role: Role) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return inUsersCaseLoadAndUserHasSomeRolesFrom([role])(permission, context)
  }

export default inUsersCaseLoadAndUserHasRole
