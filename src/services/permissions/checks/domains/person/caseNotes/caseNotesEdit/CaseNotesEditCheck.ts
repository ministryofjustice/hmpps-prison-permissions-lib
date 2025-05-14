import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import caseNotesReadAndEditCheck from '../CaseNotesReadAndEditCheck'

const permission = CaseNotesPermission.edit

export default function caseNotesEditCheck(request: PermissionsCheckRequest) {
  return caseNotesReadAndEditCheck(permission, request)
}
