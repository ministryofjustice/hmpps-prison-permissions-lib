import {
  isActiveCaseLoad,
  isInUsersCaseLoad,
  isRequiredPermission,
  userHasAllRoles,
  userHasRole,
  userHasSomeRolesFrom,
} from './PermissionUtils'
import { ExternalUser, PrisonUser, ProbationUser } from '../../../types/user/HmppsUser'
import CaseLoad from '../../../types/user/CaseLoad'
import { PrisonerBasePermission } from '../../../types/permissions/prisoner/PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../../../types/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../types/user/Role'

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
        expect(userHasSomeRolesFrom(roles, userRoles)).toEqual(result)
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
        expect(userHasAllRoles(roles, userRoles)).toEqual(result)
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
        expect(userHasRole(role, userRoles)).toEqual(result)
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
})
