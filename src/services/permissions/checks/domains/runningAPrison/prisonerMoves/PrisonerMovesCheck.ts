import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import {
  PrisonerMovesPermission,
  PrisonerMovesPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerMoves/PrisonerMovesPermissions'
import baseCheckAndUserHasRole from '../../../sharedChecks/baseCheckAndUserHasRole/BaseCheckAndUserHasRole'
import { Role } from '../../../../../../types/internal/user/Role'
import baseCheckAndUserHasSomeRolesFrom from '../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'

export default function prisonerMovesCheck(context: PrisonerPermissionsContext): PrisonerMovesPermissions {
  const check = checkWith(context)
  return {
    ...check(
      PrisonerMovesPermission.read_temporary_absence,
      baseCheckAndUserHasSomeRolesFrom([
        Role.ExternalMovementsTemporaryAbsenceViewOnly,
        Role.ExternalMovementsTemporaryAbsenceManagement,
      ]),
    ),
    ...check(
      PrisonerMovesPermission.edit_temporary_absence,
      baseCheckAndUserHasRole(Role.ExternalMovementsTemporaryAbsenceManagement),
    ),
  }
}
