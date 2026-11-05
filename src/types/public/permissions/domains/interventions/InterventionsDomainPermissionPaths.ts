import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { personInterventionsPermissionPaths } from './personInterventions/PersonInterventionsPermissionPaths'
import { InterventionsDomainPermission } from './InterventionsDomainPermissions'

export const interventionsDomainPermissionPaths: Record<InterventionsDomainPermission, Path<PrisonerPermissions>> = {
  ...personInterventionsPermissionPaths,
}
