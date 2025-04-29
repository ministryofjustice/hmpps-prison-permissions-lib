import {
  checkSentenceAndOffenceDomainAccess,
  isSentenceAndOffenceDomainPermission,
  SentenceAndOffenceDomainPermission,
  SentenceAndOffenceDomainPermissions,
} from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'

export enum PrisonerBasePermission {
  read = 'prisoner:base-record:read',
}

/**
 * These permissions define what a HMPPS user can do with respect to data held about a prisoner.
 */
export interface PrisonerPermissions {
  [PrisonerBasePermission.read]: boolean

  domainGroups: {
    // Not a full list, for demonstration purposes at the moment:
    sentenceAndOffence: SentenceAndOffenceDomainPermissions
  }
}

export type PrisonerPermission = PrisonerBasePermission | SentenceAndOffenceDomainPermission

export function checkPrisonerAccess(permission: PrisonerPermission, permissions: PrisonerPermissions): boolean {
  if (permission === PrisonerBasePermission.read) {
    return permissions[PrisonerBasePermission.read]
  }

  if (isSentenceAndOffenceDomainPermission(permission as string, permissions.domainGroups.sentenceAndOffence)) {
    return checkSentenceAndOffenceDomainAccess(
      permission as SentenceAndOffenceDomainPermission,
      permissions.domainGroups.sentenceAndOffence,
    )
  }

  return false
}
