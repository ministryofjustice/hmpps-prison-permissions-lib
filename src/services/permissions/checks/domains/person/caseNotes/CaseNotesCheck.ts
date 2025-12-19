import PermissionsCheckContext from '../../../PermissionsCheckContext'
import caseNotesReadCheck from './caseNotesRead/CaseNotesReadCheck'
import {
  CaseNotesPermission,
  CaseNotesPermissions,
} from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import sensitiveCaseNotesReadCheck from './sensitiveCaseNotesRead/SensitiveCaseNotesReadCheck'
import sensitiveCaseNotesDeleteCheck from './sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteCheck'
import sensitiveCaseNotesEditCheck from './sensitiveCaseNotesEdit/SensitiveCaseNotesEditCheck'
import caseNotesEditCheck from './caseNotesEdit/CaseNotesEditCheck'

export default function caseNotesCheck(context: PermissionsCheckContext): CaseNotesPermissions {
  return {
    [CaseNotesPermission.read]: caseNotesReadCheck(context),
    [CaseNotesPermission.edit]: caseNotesEditCheck(context),
    [CaseNotesPermission.read_sensitive]: sensitiveCaseNotesReadCheck(context),
    [CaseNotesPermission.delete_sensitive]: sensitiveCaseNotesDeleteCheck(context),
    [CaseNotesPermission.edit_sensitive]: sensitiveCaseNotesEditCheck(context),
  }
}
