import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../../internal/utils/Path'
import { probationDocumentsPermissionPaths } from './probationDocuments/ProbationDocumentsPermissionPaths'
import { ProbationDomainPermission } from './ProbationDomainPermissions'

export const probationDomainPermissionPaths: Record<ProbationDomainPermission, Path<PrisonerPermissions>> = {
  ...probationDocumentsPermissionPaths,
}
