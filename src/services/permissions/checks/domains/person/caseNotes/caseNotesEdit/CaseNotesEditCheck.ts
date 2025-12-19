import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import caseNotesReadAndEditCheck from '../CaseNotesReadAndEditCheck'

const permission = CaseNotesPermission.edit

export default function caseNotesEditCheck(request: PermissionsCheckContext) {
  return caseNotesReadAndEditCheck(permission, request)
}
