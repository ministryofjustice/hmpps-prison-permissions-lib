import { PrisonerBasePermission } from './PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { PrisonerMoneyPermission } from '../domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions'
import { prisonerPermissionsMock } from '../../../testUtils/PrisonerPermissionsMock'
import checkPrisonerAccess from './PrisonerPermissionsUtils'
import { PrisonerAdjudicationsPermission } from '../domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { setPersonSentenceCalculationPermission } from '../domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissionsUtils'
import { setPrisonerMoneyPermission } from '../domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissionsUtils'
import { setPrisonerAdjudicationsPermission } from '../domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissionsUtils'

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
        const permissions = (allowed: boolean) => setPersonSentenceCalculationPermission(permission, allowed)
        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })

  describe('Prisoner Specific domain permissions', () => {
    it.each([PrisonerMoneyPermission.read])(
      'Can check prisoner money permission: %s',
      (permission: PrisonerMoneyPermission) => {
        const permissions = (allowed: boolean) => setPrisonerMoneyPermission(permission, allowed)
        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )

    it.each([PrisonerAdjudicationsPermission.read])(
      'Can check prisoner adjudications permission: %s',
      (permission: PrisonerAdjudicationsPermission) => {
        const permissions = (allowed: boolean) => setPrisonerAdjudicationsPermission(permission, allowed)
        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })
})
