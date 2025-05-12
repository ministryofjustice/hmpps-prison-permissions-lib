import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import pathfinderReadCheck from './pathfinderRead/PathfinderReadCheck'
import {
  PathfinderPermission,
  PathfinderPermissions,
} from '../../../../../../types/permissions/domains/security/pathfinder/PathfinderPermissions'
import pathfinderEditCheck from './pathfinderEdit/PathfinderEditCheck'

export default function pathfinderCheck(request: PermissionsCheckRequest): PathfinderPermissions {
  return {
    [PathfinderPermission.read]: pathfinderReadCheck(request),
    [PathfinderPermission.edit]: pathfinderEditCheck(request),
  }
}
