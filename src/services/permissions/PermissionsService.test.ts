import PermissionsService from './PermissionsService'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerBasePermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'
import { prisonUserMock } from '../../testUtils/UserMocks'
import { prisonerMock } from '../../testUtils/PrisonerMocks'
import { PersonSentenceCalculationPermission } from '../../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { PermissionCheckStatus } from '../../types/internal/permissions/PermissionCheckStatus'
import { isGranted } from '../../types/public/permissions/prisoner/PrisonerPermissionsUtils'
import { Role } from '../../types/internal/user/Role'
import { HmppsUser } from '../../types/internal/user/HmppsUser'

jest.mock('./PermissionsLogger')

const MockedPermissionsLogger = PermissionsLogger as jest.MockedClass<typeof PermissionsLogger>

describe('PermissionsService', () => {
  let prisonerSearchClient: PrisonerSearchClient
  let permissionsLogger: PermissionsLogger
  let service: PermissionsService

  beforeEach(() => {
    jest.resetAllMocks()
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient
    permissionsLogger = new MockedPermissionsLogger(console)

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonerSearchClient, permissionsLogger)
  })

  describe('getPrisonerPermissions', () => {
    // Individual permission tests are covered in their respective check test files
    it('generates prisoner permissions', () => {
      const permissions = service.getPrisonerPermissions({
        user: prisonUserMock,
        prisoner: prisonerMock,
        requestDependentOn: [PrisonerBasePermission.read],
      })

      expect(permissions).toBeDefined()
      expect(permissions[PrisonerBasePermission.read]).toBeTruthy()
    })

    describe('logging permission failures', () => {
      const prisonerNotInCaseload: Prisoner = {
        ...prisonerMock,
        prisonId: 'OTHER',
      }

      it('logs when a required permission check is denied', () => {
        service.getPrisonerPermissions({
          user: prisonUserMock,
          prisoner: prisonerNotInCaseload,
          requestDependentOn: [PrisonerBasePermission.read],
        })

        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          prisonUserMock,
          prisonerNotInCaseload,
          PrisonerBasePermission.read,
          expect.any(String),
        )
      })

      it('does not log when the permission is not in requestDependentOn', () => {
        service.getPrisonerPermissions({
          user: prisonUserMock,
          prisoner: prisonerNotInCaseload,
          requestDependentOn: [],
        })

        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
      })

      it('does not log when the permission check passes', () => {
        service.getPrisonerPermissions({
          user: prisonUserMock,
          prisoner: prisonerMock,
          requestDependentOn: [PrisonerBasePermission.read],
        })

        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalledWith(
          prisonUserMock,
          prisonerMock,
          PrisonerBasePermission.read,
          expect.any(String),
        )
      })
    })

    describe('readOnly permissions', () => {
      const userWithPermission: HmppsUser = {
        ...prisonUserMock,
        userRoles: [Role.ReleaseDatesCalculator, Role.AdjustmentsMaintainer],
      }
      let readOnlyService: PermissionsService

      beforeEach(() => {
        // @ts-expect-error - We are using a private constructor here for testing
        readOnlyService = new (PermissionsService as unknown)(prisonerSearchClient, permissionsLogger, true)
      })

      it('allows read permissions when readOnly is true', () => {
        const permissions = readOnlyService.getPrisonerPermissions({
          user: userWithPermission,
          prisoner: prisonerMock,
          requestDependentOn: [],
        })

        expect(isGranted(PrisonerBasePermission.read, permissions)).toBe(true)
        expect(isGranted(PersonSentenceCalculationPermission.read, permissions)).toBe(true)
      })

      it('denies write permissions when readOnly is true', () => {
        const permissions = readOnlyService.getPrisonerPermissions({
          user: userWithPermission,
          prisoner: prisonerMock,
          requestDependentOn: [],
        })

        expect(isGranted(PersonSentenceCalculationPermission.edit_adjustments, permissions)).toBe(false)
      })

      it(`logs permission denied reason as 'READ_ONLY'`, () => {
        readOnlyService.getPrisonerPermissions({
          user: userWithPermission,
          prisoner: prisonerMock,
          requestDependentOn: [PersonSentenceCalculationPermission.edit_adjustments],
        })

        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          userWithPermission,
          prisonerMock,
          PersonSentenceCalculationPermission.edit_adjustments,
          PermissionCheckStatus.READ_ONLY,
        )
      })

      it('allows write permissions when readOnly is false', () => {
        const permissions = service.getPrisonerPermissions({
          user: userWithPermission,
          prisoner: prisonerMock,
          requestDependentOn: [],
        })

        expect(
          permissions.domainGroups.sentenceAndOffence.personSentenceCalculation[
            PersonSentenceCalculationPermission.edit_adjustments
          ],
        ).toBe(true)
      })
    })
  })

  describe('getPrisonerDetails', () => {
    it('returns result from Prisoner Search client', async () => {
      const prisonerData = { prisonerNumber: 'A1234BC' } as Prisoner

      prisonerSearchClient.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerData))

      expect(await service.getPrisonerDetails('A1234BC')).toEqual(prisonerData)
    })
  })
})
