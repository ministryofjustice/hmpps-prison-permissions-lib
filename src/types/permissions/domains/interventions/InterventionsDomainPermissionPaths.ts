import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { personInterventionsPermissionPaths } from './personInterventions/PersonInterventionsPermissionPaths'
import { InterventionsDomainPermission } from './InterventionsDomainPermissions'

// eslint-disable-next-line import/prefer-default-export
export const interventionsDomainPermissionPaths: Record<InterventionsDomainPermission, Path<PrisonerPermissions>> = {
  ...personInterventionsPermissionPaths,
}
