import {
  SentenceAndOffenceDomainPermission,
  SentenceAndOffenceDomainPermissions,
} from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import {
  PrisonerSpecificDomainPermission,
  PrisonerSpecificDomainPermissions,
} from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissions'

export enum PrisonerBasePermission {
  read = 'prisoner:base-record:read',
}

/**
 * These permissions define what a HMPPS user can do with respect to data held about a prisoner.
 */
export interface PrisonerPermissions {
  [PrisonerBasePermission.read]: boolean

  domainGroups: {
    sentenceAndOffence: SentenceAndOffenceDomainPermissions
    prisonerSpecific: PrisonerSpecificDomainPermissions
  }
}

export type PrisonerPermission =
  | PrisonerBasePermission
  | SentenceAndOffenceDomainPermission
  | PrisonerSpecificDomainPermission
