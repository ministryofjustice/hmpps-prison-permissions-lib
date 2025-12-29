import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  CaseNotesPermission,
  CaseNotesPermissions,
} from '../../../../../../types/public/permissions/domains/person/caseNotes/CaseNotesPermissions'
import sensitiveCaseNotesReadCheck from './sensitiveCaseNotesRead/SensitiveCaseNotesReadCheck'
import sensitiveCaseNotesDeleteCheck from './sensitiveCaseNotesDelete/SensitiveCaseNotesDeleteCheck'
import sensitiveCaseNotesEditCheck from './sensitiveCaseNotesEdit/SensitiveCaseNotesEditCheck'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import caseNotesReadAndEditCheck from './CaseNotesReadAndEditCheck'

export default function caseNotesCheck(context: PrisonerPermissionsContext): CaseNotesPermissions {
  const check = checkWith(context)
  return {
    ...check(CaseNotesPermission.read, caseNotesReadAndEditCheck),
    ...check(CaseNotesPermission.edit, caseNotesReadAndEditCheck),
    ...check(CaseNotesPermission.read_sensitive, sensitiveCaseNotesReadCheck),
    ...check(CaseNotesPermission.delete_sensitive, sensitiveCaseNotesDeleteCheck),
    ...check(CaseNotesPermission.edit_sensitive, sensitiveCaseNotesEditCheck),
  }
}
