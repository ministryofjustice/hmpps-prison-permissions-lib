import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../utils/Path'
import { CaseNotesPermission } from './CaseNotesPermissions'

// eslint-disable-next-line import/prefer-default-export
export const caseNotesPermissionPaths: Record<CaseNotesPermission, Path<PrisonerPermissions>> = {
  [CaseNotesPermission.read]: `domainGroups.person.caseNotes.${CaseNotesPermission.read}`,
  [CaseNotesPermission.edit]: `domainGroups.person.caseNotes.${CaseNotesPermission.edit}`,
  [CaseNotesPermission.read_sensitive]: `domainGroups.person.caseNotes.${CaseNotesPermission.read_sensitive}`,
  [CaseNotesPermission.delete_sensitive]: `domainGroups.person.caseNotes.${CaseNotesPermission.delete_sensitive}`,
  [CaseNotesPermission.edit_sensitive]: `domainGroups.person.caseNotes.${CaseNotesPermission.edit_sensitive}`,
}
