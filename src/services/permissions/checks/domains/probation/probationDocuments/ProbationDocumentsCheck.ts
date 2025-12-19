import PermissionsCheckContext from '../../../PermissionsCheckContext'
import probationDocumentsReadCheck from './probationDocumentsRead/ProbationDocumentsReadCheck'
import {
  ProbationDocumentsPermission,
  ProbationDocumentsPermissions,
} from '../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'

export default function probationDocumentsCheck(request: PermissionsCheckContext): ProbationDocumentsPermissions {
  return {
    [ProbationDocumentsPermission.read]: probationDocumentsReadCheck(request),
  }
}
