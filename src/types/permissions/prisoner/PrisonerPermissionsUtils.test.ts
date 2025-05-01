import { PrisonerBasePermission, PrisonerPermissions } from './PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import { PrisonerMoneyPermission } from '../domains/prisonerSpecific/PrisonerMoneyPermissions'
import { prisonerPermissionsMock } from '../../../testUtils/PrisonerPermissionsMock'
import checkPrisonerAccess from './PrisonerPermissionsUtils'

describe('Prisoner Permissions', () => {
  describe('Base record permissions', () => {
    it.each([PrisonerBasePermission.read])(
      'Can check base record permission: %s',
      (permission: PrisonerBasePermission) => {
        const permissions = (allowed: boolean) => ({ ...prisonerPermissionsMock, [permission]: allowed })
        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })

  describe('Sentence / Offence domain permissions', () => {
    it.each([PersonSentenceCalculationPermission.read, PersonSentenceCalculationPermission.edit_adjustments])(
      'Can check person sentence calculation permission: %s',
      (permission: PersonSentenceCalculationPermission) => {
        const permissions = (allowed: boolean) =>
          ({
            ...prisonerPermissionsMock,
            domainGroups: {
              sentenceAndOffence: {
                personSentenceCalculation: {
                  ...prisonerPermissionsMock.domainGroups.sentenceAndOffence.personSentenceCalculation,
                  [permission]: allowed,
                },
              },
            },
          }) as PrisonerPermissions

        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })

  describe('Prisoner Specific domain permissions', () => {
    it.each([PrisonerMoneyPermission.read])(
      'Can check prisoner money permission: %s',
      (permission: PrisonerMoneyPermission) => {
        const permissions = (allowed: boolean) =>
          ({
            ...prisonerPermissionsMock,
            domainGroups: {
              prisonerSpecific: {
                prisonerMoney: {
                  ...prisonerPermissionsMock.domainGroups.prisonerSpecific.prisonerMoney,
                  [permission]: allowed,
                },
              },
            },
          }) as PrisonerPermissions

        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })
})
