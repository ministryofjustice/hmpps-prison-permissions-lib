import { PrisonerPermission } from '../../../../../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { Role } from '../../../../../types/internal/user/Role'
import inActiveCaseLoadAndUserHasSomeRolesFrom from '../inActiveCaseLoadAndUserHasSomeRolesFrom/InActiveCaseLoadAndUserHasSomeRolesFrom'

const inActiveCaseLoadAndUserHasRole =
  (role: Role) => (permission: PrisonerPermission, context: PrisonerPermissionsContext) => {
    return inActiveCaseLoadAndUserHasSomeRolesFrom([role])(permission, context)
  }

export default inActiveCaseLoadAndUserHasRole
