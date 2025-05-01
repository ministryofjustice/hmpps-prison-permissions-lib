import { SentenceAndOffenceDomainPermission } from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import { PrisonerSpecificDomainPermission } from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import {
  checkSentenceAndOffenceDomainAccess,
  isSentenceAndOffenceDomainPermission,
} from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissionsUtils'
import {
  checkPrisonerSpecificDomainAccess,
  isPrisonerSpecificDomainPermission,
} from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissionsUtils'
import { PrisonerBasePermission, PrisonerPermission, PrisonerPermissions } from './PrisonerPermissions'

export default function checkPrisonerAccess(permission: PrisonerPermission, permissions: PrisonerPermissions): boolean {
  if (permission === PrisonerBasePermission.read) {
    return permissions[PrisonerBasePermission.read]
  }

  if (isSentenceAndOffenceDomainPermission(permission as string, permissions.domainGroups.sentenceAndOffence)) {
    return checkSentenceAndOffenceDomainAccess(
      permission as SentenceAndOffenceDomainPermission,
      permissions.domainGroups.sentenceAndOffence,
    )
  }

  if (isPrisonerSpecificDomainPermission(permission as string, permissions.domainGroups.prisonerSpecific)) {
    return checkPrisonerSpecificDomainAccess(
      permission as PrisonerSpecificDomainPermission,
      permissions.domainGroups.prisonerSpecific,
    )
  }

  return false
}
