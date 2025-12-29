import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import probationDocumentsReadCheck from './probationDocumentsRead/ProbationDocumentsReadCheck'
import {
  ProbationDocumentsPermission,
  ProbationDocumentsPermissions,
} from '../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function probationDocumentsCheck(context: PrisonerPermissionsContext): ProbationDocumentsPermissions {
  const check = checkWith(context)
  return {
    ...check(ProbationDocumentsPermission.read, probationDocumentsReadCheck),
  }
}
