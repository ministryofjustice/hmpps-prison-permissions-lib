import {
  isPersonDomainPermission,
  checkPersonDomainAccess,
  PersonDomainPermission,
  PersonDomainPermissions,
} from '../domains/person/PersonDomainPermissions'
import {
  checkPersonPlanAndNeedsDomainAccess,
  isPersonPlanAndNeedsDomainPermission,
  PersonPlanAndNeedsDomainPermission,
  PersonPlanAndNeedsDomainPermissions,
} from '../domains/personPlanAndNeeds/PersonPlanAndNeedsDomainPermissions'
import {
  checkCourtAndLegalDomainAccess,
  CourtAndLegalDomainPermission,
  CourtAndLegalDomainPermissions,
  isCourtAndLegalDomainPermission,
} from '../domains/courtAndLegal/CourtAndLegalDomainPermissions'

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
    person: PersonDomainPermissions
    personPlanAndNeeds: PersonPlanAndNeedsDomainPermissions
    courtAndLegal: CourtAndLegalDomainPermissions
  }
}

export type PrisonerPermission =
  | PrisonerBasePermission
  | CourtAndLegalDomainPermission
  | PersonDomainPermission
  | PersonPlanAndNeedsDomainPermission

export function checkPrisonerAccess(permission: PrisonerPermission, permissions: PrisonerPermissions): boolean {
  if (permission === PrisonerBasePermission.read) {
    return permissions[PrisonerBasePermission.read]
  }

  if (isCourtAndLegalDomainPermission(permission as string, permissions.domainGroups.courtAndLegal)) {
    return checkCourtAndLegalDomainAccess(
      permission as CourtAndLegalDomainPermission,
      permissions.domainGroups.courtAndLegal,
    )
  }

  if (isPersonDomainPermission(permission as string, permissions.domainGroups.person)) {
    return checkPersonDomainAccess(permission as PersonDomainPermission, permissions.domainGroups.person)
  }

  if (isPersonPlanAndNeedsDomainPermission(permission as string, permissions.domainGroups.personPlanAndNeeds)) {
    return checkPersonPlanAndNeedsDomainAccess(
      permission as PersonPlanAndNeedsDomainPermission,
      permissions.domainGroups.personPlanAndNeeds,
    )
  }

  return false
}
