import { PrisonerPermissions } from '../../prisoner/PrisonerPermissions'
import { Path } from '../../../utils/Path'
import { caseNotesPermissionPaths } from './caseNotes/CaseNotesPermissionPaths'
import { PersonDomainPermission } from './PersonDomainPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personDomainPermissionPaths: Record<PersonDomainPermission, Path<PrisonerPermissions>> = {
  ...caseNotesPermissionPaths,
}
