import PermissionsService from './PermissionsService'
import PrisonApiClient from '../../data/prisonApi/PrisonApiClient'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import { HmppsUser, PrisonUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'
import baseCheck from './checks/baseCheck/BaseCheck'
import { PrisonerBasePermission } from '../../types/permissions/prisoner/PrisonerPermissions'

jest.mock('./checks/baseCheck/BaseCheck', () => jest.fn())

describe('PermissionsService', () => {
  let prisonApiClient: PrisonApiClient
  let prisonerSearchClient: PrisonerSearchClient
  let permissionsLogger: PermissionsLogger

  let service: PermissionsService

  beforeEach(() => {
    prisonApiClient = { isUserAKeyWorker: jest.fn() } as unknown as PrisonApiClient
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonApiClient, prisonerSearchClient, permissionsLogger)
  })

  describe('getPrisonerPermissions', () => {
    it.each([
      [PermissionCheckStatus.OK, true, false],
      ...Object.values(PermissionCheckStatus)
        .filter(status => status !== PermissionCheckStatus.OK)
        .map(status => [status, false, true]),
    ] as string[][])(
      `base check status: '%s' results in permission: '%s' and logger called: '%s'`,
      async (status, permission, loggerCalled) => {
        const user = { authSource: 'nomis', staffId: 123 } as PrisonUser
        const prisoner = { prisonerNumber: 'A1234BC' } as Prisoner

        ;(baseCheck as jest.Mock).mockReturnValue(status)

        const permissions = service.getPrisonerPermissions({
          user,
          prisoner,
          requestDependentOn: [PrisonerBasePermission.read],
        })

        expect(permissions[PrisonerBasePermission.read]).toEqual(permission)

        if (loggerCalled) {
          expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
            user,
            prisoner,
            PrisonerBasePermission.read,
            status,
          )
        } else {
          expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
        }
      },
    )
  })

  describe('isUserAKeyWorkerAtPrison', () => {
    it.each([true, false])(`returns result: '%s' from Prison API`, async response => {
      const prisonUser = { authSource: 'nomis', staffId: 123 } as PrisonUser

      prisonApiClient.isUserAKeyWorker = jest.fn(() => Promise.resolve(response))

      expect(await service.isUserAKeyWorkerAtPrison('token', prisonUser, 'MDI')).toEqual(response)
    })

    it.each(['delius', 'external', 'azuread'])('returns false for a non-prison user of type: %s', async userType => {
      const user = { authSource: userType, staffId: 123 } as HmppsUser

      expect(await service.isUserAKeyWorkerAtPrison('token', user, 'MDI')).toBeFalsy()
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
