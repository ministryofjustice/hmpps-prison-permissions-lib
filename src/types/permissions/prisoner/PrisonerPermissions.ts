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
    courtAndLegal: CourtAndLegalDomainPermissions
  }
}

export type PrisonerPermission = PrisonerBasePermission | CourtAndLegalDomainPermission

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

  return false
}
