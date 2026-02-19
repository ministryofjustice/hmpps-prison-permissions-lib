import {
  isActiveCaseLoad,
  isInUsersCaseLoad,
  isReleased,
  isReleasedOrTransferring,
  isRequiredPermission,
  isTransferring,
  setPrisonerPermission,
  upgradePermissions,
  userHasAllRoles,
  userHasRole,
  userHasSomeRolesFrom,
} from './PermissionUtils'
import { ExternalUser, HmppsUser, PrisonUser, ProbationUser } from '../../../types/internal/user/HmppsUser'
import CaseLoad from '../../../types/internal/user/CaseLoad'
import {
  PrisonerBasePermission,
  PrisonerPermissions,
} from '../../../types/public/permissions/prisoner/PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../types/internal/user/Role'
import Prisoner from '../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isGranted } from '../../../types/public/permissions/prisoner/PrisonerPermissionsUtils'
import { prisonerPermissionsMock } from '../../../testUtils/PrisonerPermissionsMock'

describe('PermissionUtils', () => {
  describe('isRequiredPermission', () => {
    it('returns true if permission is required', async () => {
      expect(isRequiredPermission(PrisonerBasePermission.read, [])).toBe(false)
      expect(isRequiredPermission(PrisonerBasePermission.read, [PersonSentenceCalculationPermission.read])).toBe(false)
      expect(isRequiredPermission(PrisonerBasePermission.read, [PrisonerBasePermission.read])).toBe(true)
      expect(
        isRequiredPermission(PrisonerBasePermission.read, [
          PrisonerBasePermission.read,
          PersonSentenceCalculationPermission.read,
        ]),
      ).toBe(true)
    })
  })

  describe('userHasSomeRolesFrom', () => {
    test.each`
      roles                                              | userRoles                                          | result
      ${[]}                                              | ${[Role.GlobalSearch]}                             | ${true}
      ${[Role.GlobalSearch]}                             | ${[Role.GlobalSearch]}                             | ${true}
      ${[Role.GlobalSearch]}                             | ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${true}
      ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${[Role.AdjustmentsMaintainer]}                    | ${true}
      ${[Role.GlobalSearch]}                             | ${[Role.AdjustmentsMaintainer, Role.PomUser]}      | ${false}
      ${[Role.GlobalSearch]}                             | ${[]}                                              | ${false}
    `(
      'roles to check: $roles | user roles: $userRoles | user has some roles: $result',
      async ({ roles, userRoles, result }) => {
        expect(userHasSomeRolesFrom(roles, { userRoles } as HmppsUser)).toEqual(result)
      },
    )
  })

  describe('userHasAllRoles', () => {
    test.each`
      roles                                              | userRoles                                          | result
      ${[]}                                              | ${[Role.GlobalSearch]}                             | ${true}
      ${[Role.GlobalSearch]}                             | ${[Role.GlobalSearch]}                             | ${true}
      ${[Role.GlobalSearch]}                             | ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${true}
      ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${true}
      ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${[Role.AdjustmentsMaintainer]}                    | ${false}
      ${[Role.GlobalSearch]}                             | ${[Role.AdjustmentsMaintainer, Role.PomUser]}      | ${false}
      ${[Role.GlobalSearch]}                             | ${[]}                                              | ${false}
    `(
      'roles to check: $roles | user roles: $userRoles | user has all roles: $result',
      async ({ roles, userRoles, result }) => {
        expect(userHasAllRoles(roles, { userRoles } as HmppsUser)).toEqual(result)
      },
    )
  })

  describe('userHasRole', () => {
    test.each`
      role                 | userRoles                                          | result
      ${Role.GlobalSearch} | ${[Role.GlobalSearch]}                             | ${true}
      ${Role.GlobalSearch} | ${[Role.GlobalSearch, Role.AdjustmentsMaintainer]} | ${true}
      ${Role.GlobalSearch} | ${[Role.AdjustmentsMaintainer, Role.PomUser]}      | ${false}
      ${Role.GlobalSearch} | ${[]}                                              | ${false}
    `(
      'roles to check: $roles | user roles: $userRoles | user has role: $result',
      async ({ role, userRoles, result }) => {
        expect(userHasRole(role, { userRoles } as HmppsUser)).toEqual(result)
      },
    )
  })

  describe('isActiveCaseLoad', () => {
    it('Should return true when the prisonId matches the active case load', () => {
      const user = { authSource: 'nomis', activeCaseLoadId: 'ABC' } as PrisonUser
      expect(isActiveCaseLoad('ABC', user)).toEqual(true)
    })

    it('Should return false when the prisonId does not match the active case load', () => {
      const user = { authSource: 'nomis', activeCaseLoadId: 'ABC' } as PrisonUser
      expect(isActiveCaseLoad('DEF', user)).toEqual(false)
    })

    it('Should return false for non prison users', () => {
      const probationUser = { authSource: 'delius' } as ProbationUser
      const externalUser = { authSource: 'external' } as ExternalUser

      expect(isActiveCaseLoad('123', probationUser)).toEqual(false)
      expect(isActiveCaseLoad('123', externalUser)).toEqual(false)
    })
  })

  describe('isInUsersCaseLoad', () => {
    it('Should return true when the user has a caseload matching the prisoner', () => {
      const caseLoads: CaseLoad[] = [
        { caseloadFunction: '', caseLoadId: 'ABC', currentlyActive: false, description: '', type: '' },
        { caseloadFunction: '', caseLoadId: 'DEF', currentlyActive: false, description: '', type: '' },
      ]
      const user = { authSource: 'nomis', caseLoads } as PrisonUser

      expect(isInUsersCaseLoad('DEF', user)).toEqual(true)
    })

    it('Should return false when the user has a caseload that doesnt match the prisoner', () => {
      const caseLoads: CaseLoad[] = [
        { caseloadFunction: '', caseLoadId: 'ABC', currentlyActive: false, description: '', type: '' },
        { caseloadFunction: '', caseLoadId: 'DEF', currentlyActive: false, description: '', type: '' },
      ]
      const user = { authSource: 'nomis', caseLoads } as PrisonUser

      expect(isInUsersCaseLoad('123', user)).toEqual(false)
    })

    it('Should return false for non prison users', () => {
      const probationUser = { authSource: 'delius' } as ProbationUser
      const externalUser = { authSource: 'external' } as ExternalUser

      expect(isInUsersCaseLoad('123', probationUser)).toEqual(false)
      expect(isInUsersCaseLoad('123', externalUser)).toEqual(false)
    })
  })

  describe('isReleased', () => {
    it.each([
      ['OUT', true],
      ['TRN', false],
      ['MDI', false],
      ['LEI', false],
    ])('', (prisonId: string, result: boolean) => {
      expect(isReleased({ prisonId } as Prisoner)).toEqual(result)
    })
  })

  describe('isTransferring', () => {
    it.each([
      ['OUT', false],
      ['TRN', true],
      ['MDI', false],
      ['LEI', false],
    ])('', (prisonId: string, result: boolean) => {
      expect(isTransferring({ prisonId } as Prisoner)).toEqual(result)
    })
  })

  describe('isReleasedOrTransferring', () => {
    it.each([
      ['OUT', true],
      ['TRN', true],
      ['MDI', false],
      ['LEI', false],
    ])('', (prisonId: string, result: boolean) => {
      expect(isReleasedOrTransferring({ prisonId } as Prisoner)).toEqual(result)
    })
  })

  describe('setPrisonerPermission', () => {
    it('should set a top-level permission to true', () => {
      const result = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
    })

    it('should set a top-level permission to false', () => {
      const permissionsWithRead: PrisonerPermissions = {
        ...prisonerPermissionsMock,
        [PrisonerBasePermission.read]: true,
      }

      const result = setPrisonerPermission(PrisonerBasePermission.read, false, permissionsWithRead)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(false)
    })

    it('should set a nested domain permission to true', () => {
      const result = setPrisonerPermission(PersonSentenceCalculationPermission.read, true, prisonerPermissionsMock)

      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(true)
    })

    it('should set a nested domain permission to false', () => {
      const result = setPrisonerPermission(PersonSentenceCalculationPermission.read, false, prisonerPermissionsMock)

      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(false)
    })

    it('should not mutate the original permissions object', () => {
      const originalPermissions = structuredClone(prisonerPermissionsMock)

      setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)

      expect(prisonerPermissionsMock).toEqual(originalPermissions)
    })

    it('should preserve other permissions when setting a single permission', () => {
      const permissionsWithRead: PrisonerPermissions = {
        ...prisonerPermissionsMock,
        [PrisonerBasePermission.read]: true,
      }

      const result = setPrisonerPermission(PersonSentenceCalculationPermission.read, true, permissionsWithRead)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(true)
    })
  })

  describe('upgradePermissions', () => {
    it('should upgrade a permission that is false in base but true in additional', () => {
      const basePermissions = structuredClone(prisonerPermissionsMock)
      const additionalPermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
    })

    it('should not downgrade a permission that is true in base but false in additional', () => {
      const basePermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)
      const additionalPermissions = structuredClone(prisonerPermissionsMock)

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
    })

    it('should preserve permissions that are true in both base and additional', () => {
      const basePermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)
      const additionalPermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
    })

    it('should keep permissions false when false in both base and additional', () => {
      const basePermissions = structuredClone(prisonerPermissionsMock)
      const additionalPermissions = structuredClone(prisonerPermissionsMock)

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(false)
    })

    it('should upgrade nested domain permissions', () => {
      const basePermissions = structuredClone(prisonerPermissionsMock)
      const additionalPermissions = setPrisonerPermission(
        PersonSentenceCalculationPermission.read,
        true,
        prisonerPermissionsMock,
      )

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(true)
    })

    it('should not mutate the original base permissions object', () => {
      const basePermissions = structuredClone(prisonerPermissionsMock)
      const originalBasePermissions = structuredClone(basePermissions)
      const additionalPermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)

      upgradePermissions(basePermissions, additionalPermissions)

      expect(basePermissions).toEqual(originalBasePermissions)
    })

    it('should upgrade multiple permissions from additional', () => {
      const basePermissions = structuredClone(prisonerPermissionsMock)
      let additionalPermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)
      additionalPermissions = setPrisonerPermission(
        PersonSentenceCalculationPermission.read,
        true,
        additionalPermissions,
      )

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(true)
    })

    it('should preserve existing base permissions while adding new ones from additional', () => {
      const basePermissions = setPrisonerPermission(PrisonerBasePermission.read, true, prisonerPermissionsMock)
      const additionalPermissions = setPrisonerPermission(
        PersonSentenceCalculationPermission.read,
        true,
        prisonerPermissionsMock,
      )

      const result = upgradePermissions(basePermissions, additionalPermissions)

      expect(isGranted(PrisonerBasePermission.read, result)).toBe(true)
      expect(isGranted(PersonSentenceCalculationPermission.read, result)).toBe(true)
    })
  })
})
