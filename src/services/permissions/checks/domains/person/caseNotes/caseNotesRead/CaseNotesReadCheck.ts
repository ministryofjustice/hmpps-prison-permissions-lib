import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { CaseNotesPermission } from '../../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import caseNotesReadAndEditCheck from '../CaseNotesReadAndEditCheck'

const permission = CaseNotesPermission.read

export default function caseNotesReadCheck(request: PermissionsCheckContext) {
  return caseNotesReadAndEditCheck(permission, request)
}
