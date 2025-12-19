import PermissionsCheckContext from '../../PermissionsCheckContext'
import { SecurityDomainPermissions } from '../../../../../types/public/permissions/domains/security/SecurityDomainPermissions'
import pathfinderCheck from './pathfinder/PathfinderCheck'
import socCheck from './soc/SOCCheck'

export default function securityCheck(request: PermissionsCheckContext): SecurityDomainPermissions {
  return {
    pathfinder: pathfinderCheck(request),
    soc: socCheck(request),
  }
}
