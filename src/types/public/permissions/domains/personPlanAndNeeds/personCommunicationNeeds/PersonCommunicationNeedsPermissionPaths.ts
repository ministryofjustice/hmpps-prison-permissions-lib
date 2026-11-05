import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonCommunicationNeedsPermission } from './PersonCommunicationNeedsPermissions'

const basePath: Path<PrisonerPermissions> = 'domainGroups.personPlanAndNeeds.personCommunicationNeeds'

export const personCommunicationNeedsPermissionPaths: Record<
  PersonCommunicationNeedsPermission,
  Path<PrisonerPermissions>
> = {
  [PersonCommunicationNeedsPermission.read_language]: `${basePath}.${PersonCommunicationNeedsPermission.read_language}`,
  [PersonCommunicationNeedsPermission.edit_language]: `${basePath}.${PersonCommunicationNeedsPermission.edit_language}`,
}
