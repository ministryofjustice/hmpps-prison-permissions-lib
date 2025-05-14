import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import caseNotesReadCheck from './caseNotesRead/CaseNotesReadCheck'
import {
  CaseNotesPermission,
  CaseNotesPermissions,
} from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import sensitiveCaseNotesReadCheck from './sensitiveCaseNotesRead/SensitiveCaseNotesReadCheck'
import sensitiveCaseNotesDeleteCheck from './sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteCheck'
import sensitiveCaseNotesEditCheck from './sensitiveCaseNotesEdit/SensitiveCaseNotesEditCheck'
import caseNotesEditCheck from './caseNotesEdit/CaseNotesEditCheck'

export default function caseNotesCheck(request: PermissionsCheckRequest): CaseNotesPermissions {
  return {
    [CaseNotesPermission.read]: caseNotesReadCheck(request),
    [CaseNotesPermission.edit]: caseNotesEditCheck(request),
    [CaseNotesPermission.read_sensitive]: sensitiveCaseNotesReadCheck(request),
    [CaseNotesPermission.delete_sensitive]: sensitiveCaseNotesDeleteCheck(request),
    [CaseNotesPermission.edit_sensitive]: sensitiveCaseNotesEditCheck(request),
  }
}
