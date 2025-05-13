import {
  SentenceAndOffenceDomainPermission,
  SentenceAndOffenceDomainPermissions,
} from '../domains/sentenceAndOffence/SentenceAndOffenceDomainPermissions'
import {
  PrisonerSpecificDomainPermission,
  PrisonerSpecificDomainPermissions,
} from '../domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import {
  RunningAPrisonDomainPermission,
  RunningAPrisonDomainPermissions,
} from '../domains/runningAPrison/RunningAPrisonDomainPermissions'
import { PersonDomainPermission, PersonDomainPermissions } from '../domains/person/PersonDomainPermissions'
import { SecurityDomainPermission, SecurityDomainPermissions } from '../domains/security/SecurityDomainPermissions'
import { ProbationDomainPermissions } from '../domains/probation/ProbationDomainPermissions'
import { ProbationDocumentsPermission } from '../domains/probation/probationDocuments/ProbationDocumentsPermissions'

export enum PrisonerBasePermission {
  read = 'prisoner:base-record:read',
}

/**
 * These permissions define what a HMPPS user can do with respect to data held about a prisoner.
 */
export interface PrisonerPermissions {
  [PrisonerBasePermission.read]: boolean

  domainGroups: {
    person: PersonDomainPermissions
    prisonerSpecific: PrisonerSpecificDomainPermissions
    probation: ProbationDomainPermissions
    runningAPrison: RunningAPrisonDomainPermissions
    security: SecurityDomainPermissions
    sentenceAndOffence: SentenceAndOffenceDomainPermissions
  }
}

export type PrisonerPermission =
  | PrisonerBasePermission
  | PersonDomainPermission
  | PrisonerSpecificDomainPermission
  | ProbationDocumentsPermission
  | RunningAPrisonDomainPermission
  | SecurityDomainPermission
  | SentenceAndOffenceDomainPermission
