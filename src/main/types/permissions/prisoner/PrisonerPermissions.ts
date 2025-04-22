export enum PrisonerBasePermission {
  read = 'prisoner:base-record:read',
}

/**
 * These permissions define what a HMPPS user can do with respect to data held about a prisoner.
 */
export interface PrisonerPermissions {
  [PrisonerBasePermission.read]: boolean

  // TODO:
  // domainGroups: {
  //   ...
  // }
}

export type PrisonerPermission = PrisonerBasePermission

export function checkPrisonerAccess(permission: PrisonerPermission, permissions: PrisonerPermissions): boolean {
  if (permission === PrisonerBasePermission.read) {
    return permissions[PrisonerBasePermission.read]
  }

  // TODO: Check each domain group for the permission

  return false
}
