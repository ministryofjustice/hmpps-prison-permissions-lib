import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { personCommunicationNeedsPermissionPaths } from './personCommunicationNeeds/PersonCommunicationNeedsPermissionPaths'
import { PersonPlanAndNeedsDomainPermission } from './PersonPlanAndNeedsDomainPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personPlanAndNeedsDomainPermissionPaths: Record<
  PersonPlanAndNeedsDomainPermission,
  Path<PrisonerPermissions>
> = {
  ...personCommunicationNeedsPermissionPaths,
}
