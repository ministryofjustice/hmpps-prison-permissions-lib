import { checkPrisonerAccess, PrisonerBasePermission, PrisonerPermissions } from './PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../domains/sentenceAndOffence/PersonSentenceCalculationPermissions'

describe('Prisoner Permissions', () => {
  const prisonerPermissions: PrisonerPermissions = {
    'prisoner:base-record:read': false,

    domainGroups: {
      sentenceAndOffence: {
        personSentenceCalculation: {
          'prisoner:person-sentence-calculation:read': false,
          'prisoner:person-sentence-calculation:adjustments:edit': false,
        },
      },
    },
  } as PrisonerPermissions

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

  describe('Sentence / Offence domain permissions', () => {
    it.each([PersonSentenceCalculationPermission.read, PersonSentenceCalculationPermission.edit_adjustments])(
      'Can check person sentence calculation permission: %s',
      (permission: PersonSentenceCalculationPermission) => {
        const permissions = (allowed: boolean) => ({
          ...prisonerPermissions,
          domainGroups: {
            sentenceAndOffence: {
              personSentenceCalculation: {
                ...prisonerPermissions.domainGroups.sentenceAndOffence.personSentenceCalculation,
                [permission]: allowed,
              },
            },
          },
        })

        expect(checkPrisonerAccess(permission, permissions(true))).toBe(true)
        expect(checkPrisonerAccess(permission, permissions(false))).toBe(false)
      },
    )
  })
})
