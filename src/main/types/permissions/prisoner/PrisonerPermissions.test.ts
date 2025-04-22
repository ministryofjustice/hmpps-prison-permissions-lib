import {
  PrisonerPermission,
  checkPrisonerAccess,
  PrisonerPermissions,
  PrisonerBasePermission,
} from './PrisonerPermissions'

describe('Prisoner Permissions', () => {
  const prisonerPermissions = (allowed: boolean): PrisonerPermissions => {
    return {
      'prisoner:base-record:read': allowed,
      // TODO: domainGroups...
    } as unknown as PrisonerPermissions
  }

  it.each([
    [PrisonerBasePermission.read, true],
    [PrisonerBasePermission.read, false],
  ])('Can check base record permission: %s is %s', (permission: PrisonerPermission, allowed: boolean) => {
    expect(checkPrisonerAccess(permission, prisonerPermissions(allowed))).toBe(allowed)
  })
})
