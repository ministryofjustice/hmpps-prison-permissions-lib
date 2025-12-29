import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { SecurityDomainPermissions } from '../../../../../types/public/permissions/domains/security/SecurityDomainPermissions'
import pathfinderCheck from './pathfinder/PathfinderCheck'
import socCheck from './soc/SOCCheck'

export default function securityCheck(context: PrisonerPermissionsContext): SecurityDomainPermissions {
  return {
    pathfinder: pathfinderCheck(context),
    soc: socCheck(context),
  }
}
