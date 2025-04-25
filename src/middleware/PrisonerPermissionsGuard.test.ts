import { NextFunction, Request, RequestHandler, Response } from 'express'
import { PermissionsService, PrisonerBasePermission, PrisonerPermission } from '../index'
import prisonerPermissionsGuard from './PrisonerPermissionsGuard'
import { PrisonUser } from '../types/user/HmppsUser'
import PrisonerPermissionError from '../types/errors/PrisonerPermissionError'
import { prisonUserMock } from '../testUtils/UserMocks'
import { prisonerMock } from '../testUtils/PrisonerMocks'
import {
  PersonCourtSchedulesPermission,
  setPersonCourtSchedulesPermission,
} from '../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import { PrisonerPermissions } from '../types/permissions/prisoner/PrisonerPermissions'

const examplePermissions = {
  [PrisonerBasePermission.read]: true,
} as PrisonerPermissions

let req: Request
let res: Response
let next: NextFunction

describe('PrisonerPermissionsGuard', () => {
  let permissionsService: PermissionsService

  let permissionsGuard: RequestHandler

  beforeEach(() => {
    res = { locals: { user: prisonUserMock } } as Response
    req = { params: { prisonerNumber: prisonerMock.prisonerNumber }, session: {}, middleware: {} } as unknown as Request
    next = jest.fn()

    permissionsService = {
      getPrisonerPermissions: jest.fn(),
      isUserAKeyWorkerAtPrison: jest.fn(),
      getPrisonerDetails: jest.fn(),
    } as unknown as PermissionsService

    req.middleware = { prisonerData: prisonerMock }
  })

  describe('required permissions checked', () => {
    test.each`
      requestDependentOn                              | permissions                                                                               | requestSucceeds
      ${PrisonerBasePermission.read}                  | ${{ [PrisonerBasePermission.read]: true }}                                                | ${true}
      ${PrisonerBasePermission.read}                  | ${{ [PrisonerBasePermission.read]: false }}                                               | ${false}
      ${PersonCourtSchedulesPermission.read_schedule} | ${setPersonCourtSchedulesPermission(PersonCourtSchedulesPermission.read_schedule, true)}  | ${true}
      ${PersonCourtSchedulesPermission.read_schedule} | ${setPersonCourtSchedulesPermission(PersonCourtSchedulesPermission.read_schedule, false)} | ${false}
    `(
      'requestDependentOn: $requestDependentOn, requestSucceeds: $requestSucceeds',
      async ({ requestDependentOn, permissions, requestSucceeds }) => {
        permissionsGuard = prisonerPermissionsGuard(permissionsService, { requestDependentOn: [requestDependentOn] })
        permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

        await permissionsGuard(req, res, next)

        if (requestSucceeds) {
          expectRequestSucceeds(permissions)
        } else {
          expectRequestFails([requestDependentOn])
        }
      },
    )
  })

  describe('multiple required permissions checked', () => {
    it('request succeeds when all permission checks pass', async () => {
      const permissions = {
        ...setPersonCourtSchedulesPermission(PersonCourtSchedulesPermission.read_schedule, true),
        [PrisonerBasePermission.read]: true,
      }

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonCourtSchedulesPermission.read_schedule],
      })

      await permissionsGuard(req, res, next)

      expectRequestSucceeds(permissions)
    })

    it('request fails when a single permission check fails', async () => {
      const permissions = {
        ...setPersonCourtSchedulesPermission(PersonCourtSchedulesPermission.read_schedule, false),
        [PrisonerBasePermission.read]: true,
      }

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonCourtSchedulesPermission.read_schedule],
      })

      await permissionsGuard(req, res, next)

      expectRequestFails([PersonCourtSchedulesPermission.read_schedule])
    })

    it('request fails when multiple permission checks fail', async () => {
      const permissions = {
        ...setPersonCourtSchedulesPermission(PersonCourtSchedulesPermission.read_schedule, false),
        [PrisonerBasePermission.read]: false,
      }

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonCourtSchedulesPermission.read_schedule],
      })

      await permissionsGuard(req, res, next)

      expectRequestFails([PrisonerBasePermission.read, PersonCourtSchedulesPermission.read_schedule])
    })
  })

  describe('prisoner data already available', () => {
    beforeEach(() => {
      req.middleware = { prisonerData: prisonerMock }

      permissionsService.getPrisonerPermissions = jest.fn(() => examplePermissions)
      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read],
      })
    })

    it('sets permissions and calls next()', async () => {
      await permissionsGuard(req, res, next)

      expectRequestSucceeds(examplePermissions)
    })
  })

  describe('prisoner data retrieved from prisoner search', () => {
    beforeEach(() => {
      req.middleware = {}
      permissionsService.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerMock))

      permissionsService.getPrisonerPermissions = jest.fn(() => examplePermissions)
      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read],
      })
    })

    it('sets permissions and calls next()', async () => {
      await permissionsGuard(req, res, next)

      expectRequestSucceeds(examplePermissions)
    })
  })

  describe(`checks are made to see if user is a key worker at the prisoner's prison`, () => {
    beforeEach(() => {
      permissionsService.getPrisonerPermissions = jest.fn(() => examplePermissions)
      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read],
      })
    })

    it('uses the existing cache', async () => {
      req.session.keyWorkerAtPrisons = { MDI: true }

      await permissionsGuard(req, res, next)

      expectRequestSucceeds(examplePermissions)
      expectUserIsAKeyWorker()
    })

    it('checks if user is a key worker if no existing cache', async () => {
      permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))

      await permissionsGuard(req, res, next)

      expectRequestSucceeds(examplePermissions)
      expectUserIsAKeyWorker()
    })

    it('checks if user is a key worker and adds to existing cache', async () => {
      permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))
      req.session.keyWorkerAtPrisons = { LEI: false }

      await permissionsGuard(req, res, next)

      expectRequestSucceeds(examplePermissions)
      expectUserIsAKeyWorker({ LEI: false, MDI: true })
    })
  })

  describe('no permissions listed as dependent', () => {
    it('throws exception', () => {
      expect(() => prisonerPermissionsGuard(permissionsService, { requestDependentOn: [] })).toThrow(
        'Unprotected route, must provide at least one dependent permission',
      )
    })
  })
})

function expectRequestSucceeds(expected: PrisonerPermissions) {
  expect(next).toHaveBeenCalledWith()
  expect(req.middleware?.prisonerData).toEqual(prisonerMock)
  expect(res.locals.prisonerPermissions).toEqual(expected)
}

function expectRequestFails(failedPermissionChecks: PrisonerPermission[]) {
  expect(next).toHaveBeenCalledWith(new PrisonerPermissionError('Failed permissions checks', failedPermissionChecks))
}

function expectUserIsAKeyWorker(expected: Record<string, boolean> = { MDI: true }) {
  expect(req.session.keyWorkerAtPrisons).toEqual(expected)
  expect((res.locals.user as PrisonUser).keyWorkerAtPrisons).toEqual(expected)
}
