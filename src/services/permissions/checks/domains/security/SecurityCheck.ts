import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { SecurityDomainPermissions } from '../../../../../types/permissions/domains/security/SecurityDomainPermissions'
import pathfinderCheck from './pathfinder/PathfinderCheck'

export default function securityCheck(request: PermissionsCheckRequest): SecurityDomainPermissions {
  return {
    pathfinder: pathfinderCheck(request),
  }
}
