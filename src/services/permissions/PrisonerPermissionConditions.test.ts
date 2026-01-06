import { getPermissionStatus, PrisonerPermissionConditions } from './PrisonerPermissionConditions'
import { PermissionCheckStatus } from '../../types/internal/permissions/PermissionCheckStatus'
import { prisonUserMock } from '../../testUtils/UserMocks'
import { prisonerMock } from '../../testUtils/PrisonerMocks'
import { Role } from '../../types/internal/user/Role'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'

describe('getPermissionStatus', () => {
  const defaultConditions: PrisonerPermissionConditions = {
    ifRestrictedPatient: () => PermissionCheckStatus.RESTRICTED_PATIENT,
    ifReleasedPrisoner: () => PermissionCheckStatus.PRISONER_IS_RELEASED,
    ifTransferringPrisoner: () => PermissionCheckStatus.PRISONER_IS_TRANSFERRING,
    ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
    ifPrisonInCaseload: () => PermissionCheckStatus.OK,
  }

  describe('User authSource check', () => {
    it.each([
      ['nomis', PermissionCheckStatus.OK],
      ['delius', PermissionCheckStatus.NOT_PRISON_USER],
      ['external', PermissionCheckStatus.NOT_PRISON_USER],
      ['azuread', PermissionCheckStatus.NOT_PRISON_USER],
    ])('authSource: `%s` results in `%s` status', (authSource, expectedStatus) => {
      const result = getPermissionStatus(
        { ...prisonUserMock, authSource: authSource as 'nomis' | 'delius' | 'external' | 'azuread' },
        prisonerMock,
        defaultConditions,
      )

      expect(result).toBe(expectedStatus)
    })
  })

  describe('Blanket role requirement checks', () => {
    it.each([
      [{}, [], PermissionCheckStatus.OK],

      // allRolesRequired:
      [{ allRolesRequired: [Role.GlobalSearch] }, [], PermissionCheckStatus.ROLE_NOT_PRESENT],
      [{ allRolesRequired: [Role.GlobalSearch] }, [Role.PomUser], PermissionCheckStatus.ROLE_NOT_PRESENT],
      [{ allRolesRequired: [Role.GlobalSearch, Role.PomUser] }, [Role.PomUser], PermissionCheckStatus.ROLE_NOT_PRESENT],
      [
        { allRolesRequired: [Role.GlobalSearch, Role.PomUser] },
        [Role.GlobalSearch, Role.PomUser],
        PermissionCheckStatus.OK,
      ],

      // atLeastOneRoleRequiredFrom:
      [{ atLeastOneRoleRequiredFrom: [Role.GlobalSearch] }, [], PermissionCheckStatus.ROLE_NOT_PRESENT],
      [{ atLeastOneRoleRequiredFrom: [Role.GlobalSearch] }, [Role.PomUser], PermissionCheckStatus.ROLE_NOT_PRESENT],
      [{ atLeastOneRoleRequiredFrom: [Role.GlobalSearch, Role.PomUser] }, [Role.PomUser], PermissionCheckStatus.OK],

      // if both allRolesRequired and atLeastOneRoleRequiredFrom are specified:
      [
        { allRolesRequired: [Role.GlobalSearch], atLeastOneRoleRequiredFrom: [Role.PomUser] },
        [Role.GlobalSearch],
        PermissionCheckStatus.ROLE_NOT_PRESENT,
      ],
      [
        { allRolesRequired: [Role.GlobalSearch], atLeastOneRoleRequiredFrom: [Role.PomUser] },
        [Role.PomUser],
        PermissionCheckStatus.ROLE_NOT_PRESENT,
      ],
      [
        { allRolesRequired: [Role.GlobalSearch], atLeastOneRoleRequiredFrom: [Role.PomUser] },
        [Role.GlobalSearch, Role.PomUser],
        PermissionCheckStatus.OK,
      ],
    ])(
      'with role requirement: %s user with roles: %s results in status: %s',
      (roleRequirement: Partial<PrisonerPermissionConditions>, userRoles, expectedStatus) => {
        const result = getPermissionStatus({ ...prisonUserMock, userRoles }, prisonerMock, {
          ...defaultConditions,
          ...roleRequirement,
        })

        expect(result).toBe(expectedStatus)
      },
    )
  })

  describe('Overriding condition', () => {
    it('When specified, overridingCondition will take precedence', () => {
      const conditions: PrisonerPermissionConditions = {
        ...defaultConditions,
        overridingCondition: () => PermissionCheckStatus.NOT_PERMITTED,
      }

      // Even though prisoner is in caseload and not restricted/released/transferring
      const result = getPermissionStatus(prisonUserMock, prisonerMock, conditions)

      expect(result).toBe(PermissionCheckStatus.NOT_PERMITTED)
    })
  })

  describe('Restricted patient', () => {
    it('should use ifRestrictedPatient logic when prisoner is a restricted patient', () => {
      const restrictedPrisoner: Prisoner = {
        ...prisonerMock,
        restrictedPatient: true,
      }

      const result = getPermissionStatus(prisonUserMock, restrictedPrisoner, defaultConditions)

      expect(result).toBe(PermissionCheckStatus.RESTRICTED_PATIENT)
    })
  })

  describe('Released prisoner', () => {
    it('should use ifReleasedPrisoner logic when prisoner is released', () => {
      const releasedPrisoner: Prisoner = {
        ...prisonerMock,
        prisonId: 'OUT',
      }

      const result = getPermissionStatus(prisonUserMock, releasedPrisoner, defaultConditions)

      expect(result).toBe(PermissionCheckStatus.PRISONER_IS_RELEASED)
    })
  })

  describe('Transferring prisoner', () => {
    it('should use ifTransferringPrisoner logic when prisoner is transferring', () => {
      const transferringPrisoner: Prisoner = {
        ...prisonerMock,
        prisonId: 'TRN',
      }

      const result = getPermissionStatus(prisonUserMock, transferringPrisoner, defaultConditions)

      expect(result).toBe(PermissionCheckStatus.PRISONER_IS_TRANSFERRING)
    })
  })

  describe('Prison not in caseload', () => {
    it('should use ifPrisonNotInCaseload logic when prisoner is in a prison not in the user caseload', () => {
      const prisonerInDifferentPrison: Prisoner = {
        ...prisonerMock,
        prisonId: 'SOMETHING_ELSE',
      }

      const result = getPermissionStatus(prisonUserMock, prisonerInDifferentPrison, defaultConditions)

      expect(result).toBe(PermissionCheckStatus.NOT_IN_CASELOAD)
    })
  })

  describe('Prison in caseload', () => {
    it('should use ifPrisonInCaseload logic when prisoner is in user caseload', () => {
      const result = getPermissionStatus(prisonUserMock, prisonerMock, defaultConditions)

      expect(result).toBe(PermissionCheckStatus.OK)
    })
  })
})
