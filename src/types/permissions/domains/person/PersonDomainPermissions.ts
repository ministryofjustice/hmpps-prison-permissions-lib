import { CaseNotesPermission, CaseNotesPermissions } from './caseNotes/CaseNotesPermissions'

export interface PersonDomainPermissions {
  caseNotes: CaseNotesPermissions
}

export type PersonDomainPermission = CaseNotesPermission
