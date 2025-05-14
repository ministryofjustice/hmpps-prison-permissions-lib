import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { ProbationDocumentsPermission } from './ProbationDocumentsPermissions'

// eslint-disable-next-line import/prefer-default-export
export const probationDocumentsPermissionPaths: Record<ProbationDocumentsPermission, Path<PrisonerPermissions>> = {
  [ProbationDocumentsPermission.read]: `domainGroups.probation.probationDocuments.${ProbationDocumentsPermission.read}`,
}
