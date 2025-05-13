import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { probationDocumentsPermissionPaths } from './probationDocuments/ProbationDocumentsPermissionPaths'
import { ProbationDomainPermission } from './ProbationDomainPermissions'

// eslint-disable-next-line import/prefer-default-export
export const probationDomainPermissionPaths: Record<ProbationDomainPermission, Path<PrisonerPermissions>> = {
  ...probationDocumentsPermissionPaths,
}
