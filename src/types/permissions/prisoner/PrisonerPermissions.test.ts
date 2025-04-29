import { checkPrisonerAccess, PrisonerPermissions, PrisonerBasePermission } from './PrisonerPermissions'
import { PersonCourtSchedulesPermission } from '../domains/courtAndLegal/PersonCourtSchedulesPermissions'

describe('Prisoner Permissions', () => {
  const prisonerPermissions: PrisonerPermissions = {
    'prisoner:base-record:read': false,

    domainGroups: {
      courtAndLegal: {
        personCourtSchedules: {
          'prisoner:person-court-schedule:schedule:read': false,
        },
      },
    },
  } as unknown as PrisonerPermissions

  describe('Base record permissions', () => {
    it.each([PrisonerBasePermission.read])(
      'Can check base record permission: %s',
      (permission: PrisonerBasePermission) => {
        const permissions = (allowed: boolean) => ({ ...prisonerPermissions, [permission]: allowed })
        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })

  describe('Court / Legal domain permissions', () => {
    it.each([PersonCourtSchedulesPermission.read_schedule])(
      'Can check person court schedules permission: %s',
      (permission: PersonCourtSchedulesPermission) => {
        const permissions = (allowed: boolean) => ({
          ...prisonerPermissions,
          domainGroups: { courtAndLegal: { personCourtSchedules: { [permission]: allowed } } },
        })

        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })
})
