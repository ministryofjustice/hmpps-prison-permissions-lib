import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import pathfinderReadCheck from './pathfinderRead/PathfinderReadCheck'
import {
  PathfinderPermission,
  PathfinderPermissions,
} from '../../../../../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import pathfinderEditCheck from './pathfinderEdit/PathfinderEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function pathfinderCheck(context: PrisonerPermissionsContext): PathfinderPermissions {
  const check = checkWith(context)
  return {
    ...check(PathfinderPermission.read, pathfinderReadCheck),
    ...check(PathfinderPermission.edit, pathfinderEditCheck),
  }
}
