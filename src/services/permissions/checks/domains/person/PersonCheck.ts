import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import caseNotesCheck from './caseNotes/CaseNotesCheck'
import { PersonDomainPermissions } from '../../../../../types/permissions/domains/person/PersonDomainPermissions'

export default function personCheck(request: PermissionsCheckRequest): PersonDomainPermissions {
  return {
    caseNotes: caseNotesCheck(request),
  }
}
