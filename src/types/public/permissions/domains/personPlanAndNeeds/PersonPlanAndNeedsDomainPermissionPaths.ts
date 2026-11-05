import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { personCommunicationNeedsPermissionPaths } from './personCommunicationNeeds/PersonCommunicationNeedsPermissionPaths'
import { PersonPlanAndNeedsDomainPermission } from './PersonPlanAndNeedsDomainPermissions'

export const personPlanAndNeedsDomainPermissionPaths: Record<
  PersonPlanAndNeedsDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...personCommunicationNeedsPermissionPaths,
}
