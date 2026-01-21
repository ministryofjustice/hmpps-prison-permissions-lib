import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PrisonerMovesPermission } from './PrisonerMovesPermissions'

// eslint-disable-next-line import/prefer-default-export
export const prisonerMovesPermissionPaths: Record<PrisonerMovesPermission, Path<PrisonerPermissions>> = {
  [PrisonerMovesPermission.read_temporary_absence]: `domainGroups.runningAPrison.prisonerMoves.${PrisonerMovesPermission.read_temporary_absence}`,
  [PrisonerMovesPermission.edit_temporary_absence]: `domainGroups.runningAPrison.prisonerMoves.${PrisonerMovesPermission.edit_temporary_absence}`,
}
