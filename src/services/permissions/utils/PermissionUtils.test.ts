import { isInUsersCaseLoad, isRequiredPermission, userHasRoles } from './PermissionUtils'
import { ExternalUser, PrisonUser, ProbationUser } from '../../../types/user/HmppsUser'
import CaseLoad from '../../../types/user/CaseLoad'
import { PrisonerBasePermission } from '../../../types/permissions/prisoner/PrisonerPermissions'
import { PersonSentenceCalculationPermission } from '../../../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'

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

  describe('userHasRoles', () => {
    it.each([
      { roles: ['GLOBAL_SEARCH'], userRoles: ['GLOBAL_SEARCH'], result: true },
      { roles: ['GLOBAL_SEARCH'], userRoles: ['SOME_ROLE', 'GLOBAL_SEARCH'], result: true },
      { roles: ['GLOBAL_SEARCH'], userRoles: [], result: false },
      { roles: [], userRoles: ['GLOBAL_SEARCH'], result: false },
      { roles: ['GLOBAL_SEARCH', 'SOME_ROLE'], userRoles: ['SOME_ROLE'], result: true },
      { roles: ['GLOBAL_SEARCH'], userRoles: ['ROLE_GLOBAL_SEARCH'], result: true },
      { roles: ['ROLE_GLOBAL_SEARCH'], userRoles: ['GLOBAL_SEARCH'], result: true },
    ])('Should return the correct result when checking user roles', ({ roles, userRoles, result }) => {
      expect(userHasRoles(roles, userRoles)).toEqual(result)
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
