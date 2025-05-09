import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { CaseNotesPermission } from '../../../../../../../types/permissions/domains/person/caseNotes/CaseNotesPermissions'
import caseNotesReadAndEditCheck from '../CaseNotesReadAndEditCheck'

const permission = CaseNotesPermission.read

export default function caseNotesReadCheck(request: PermissionsCheckRequest) {
  return caseNotesReadAndEditCheck(permission, request)
}
