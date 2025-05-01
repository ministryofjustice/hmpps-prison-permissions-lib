import { isInUsersCaseLoad, isRequiredPermission, userHasRole, userHasSomeRolesFrom } from './PermissionUtils'
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
    it.each([
      { roles: [Role.GlobalSearch], userRoles: [Role.GlobalSearch], result: true },
      { roles: [Role.GlobalSearch], userRoles: [Role.GlobalSearch, Role.AdjustmentsMaintainer], result: true },
      { roles: [Role.GlobalSearch, Role.AdjustmentsMaintainer], userRoles: [Role.AdjustmentsMaintainer], result: true },
      { roles: [Role.GlobalSearch], userRoles: [Role.AdjustmentsMaintainer, Role.PomUser], result: false },
      { roles: [Role.GlobalSearch], userRoles: [], result: false },
      { roles: [], userRoles: [Role.GlobalSearch], result: false },
    ])('Should return the correct result when checking user roles', ({ roles, userRoles, result }) => {
      expect(userHasSomeRolesFrom(roles, userRoles)).toEqual(result)
    })
  })

  describe('userHasRole', () => {
    it.each([
      { role: Role.GlobalSearch, userRoles: [Role.GlobalSearch], result: true },
      { role: Role.GlobalSearch, userRoles: [Role.GlobalSearch, Role.AdjustmentsMaintainer], result: true },
      { role: Role.GlobalSearch, userRoles: [Role.AdjustmentsMaintainer, Role.PomUser], result: false },
      { role: Role.GlobalSearch, userRoles: [], result: false },
    ])('Should return the correct result when checking user roles', ({ role, userRoles, result }) => {
      expect(userHasRole(role, userRoles)).toEqual(result)
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
