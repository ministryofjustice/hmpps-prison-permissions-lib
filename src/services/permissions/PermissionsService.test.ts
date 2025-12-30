import PermissionsService from './PermissionsService'
import PrisonerSearchClient from '../../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from './PermissionsLogger'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PrisonerBasePermission } from '../../types/public/permissions/prisoner/PrisonerPermissions'
import { prisonUserMock } from '../../testUtils/UserMocks'
import { prisonerMock } from '../../testUtils/PrisonerMocks'

const permissionsLogger = new PermissionsLogger(console)

describe('PermissionsService', () => {
  let prisonerSearchClient: PrisonerSearchClient

  let service: PermissionsService

  beforeEach(() => {
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient

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
  })

  describe('getPrisonerDetails', () => {
    it('returns result from Prisoner Search client', async () => {
      const prisonerData = { prisonerNumber: 'A1234BC' } as Prisoner

      prisonerSearchClient.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerData))

      expect(await service.getPrisonerDetails('A1234BC')).toEqual(prisonerData)
    })
  })
})
