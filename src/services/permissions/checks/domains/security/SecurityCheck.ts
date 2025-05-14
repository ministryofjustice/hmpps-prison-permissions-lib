import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { SecurityDomainPermissions } from '../../../../../types/public/permissions/domains/security/SecurityDomainPermissions'
import pathfinderCheck from './pathfinder/PathfinderCheck'
import socCheck from './soc/SOCCheck'

export default function securityCheck(request: PermissionsCheckRequest): SecurityDomainPermissions {
  return {
    pathfinder: pathfinderCheck(request),
    soc: socCheck(request),
  }
}
