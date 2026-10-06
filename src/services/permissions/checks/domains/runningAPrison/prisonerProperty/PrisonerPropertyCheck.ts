import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import {
  PrisonerPropertyPermission,
  PrisonerPropertyPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerProperty/PrisonerPropertyPermissions'
import { Role } from '../../../../../../types/internal/user/Role'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import inUsersCaseLoadAndUserHasRole from '../../../sharedChecks/inUsersCaseLoadAndUserHasRole/InUsersCaseLoadAndUserHasRole'

export default function prisonerPropertyCheck(context: PrisonerPermissionsContext): PrisonerPropertyPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerPropertyPermission.read_property, inUsersCaseLoad),
    ...check(PrisonerPropertyPermission.edit_property, inUsersCaseLoadAndUserHasRole(Role.PrisonerPropertyManage)),
  }
}
