import PermissionsCheckContext from '../../../PermissionsCheckContext'
import pathfinderReadCheck from './pathfinderRead/PathfinderReadCheck'
import {
  PathfinderPermission,
  PathfinderPermissions,
} from '../../../../../../types/public/permissions/domains/security/pathfinder/PathfinderPermissions'
import pathfinderEditCheck from './pathfinderEdit/PathfinderEditCheck'

export default function pathfinderCheck(request: PermissionsCheckContext): PathfinderPermissions {
  return {
    [PathfinderPermission.read]: pathfinderReadCheck(request),
    [PathfinderPermission.edit]: pathfinderEditCheck(request),
  }
}
