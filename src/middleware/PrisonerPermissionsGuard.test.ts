import { NextFunction, Request, RequestHandler, Response } from 'express'
import prisonerPermissionsGuard from './PrisonerPermissionsGuard'
import PrisonerPermissionError from '../types/public/errors/PrisonerPermissionError'
import { prisonUserMock } from '../testUtils/UserMocks'
import { prisonerMock } from '../testUtils/PrisonerMocks'
import { PersonSentenceCalculationPermission } from '../types/public/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../types/public/permissions/prisoner/PrisonerPermissions'
import { setPrisonerPermission } from '../testUtils/PrisonerPermissionsMock'
import PermissionsService from '../services/permissions/PermissionsService'
import { prisonerPermissionPaths } from '../types/public/permissions/prisoner/PrisonerPermissionPaths'

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
    it.each(Object.keys(prisonerPermissionPaths) as PrisonerPermission[])(
      'requestDependentOn: %s successfully checked',
      async (permission: PrisonerPermission) => {
        await checkPermissionsGuard(setPrisonerPermission(permission, true), true)
        await checkPermissionsGuard(setPrisonerPermission(permission, false), false)

        async function checkPermissionsGuard(permissions: PrisonerPermissions, expectSuccess: boolean) {
          permissionsGuard = prisonerPermissionsGuard(permissionsService, { requestDependentOn: [permission] })
          permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

          await permissionsGuard(req, res, next)

          if (expectSuccess) {
            expectRequestAllowed(permissions)
          } else {
            expectRequestDenied([permission])
          }
        }
      },
    )
  })

  describe('multiple required permissions checked', () => {
    it('request succeeds when all permission checks pass', async () => {
      const permissions = {
        ...setPrisonerPermission(PersonSentenceCalculationPermission.read, true),
        [PrisonerBasePermission.read]: true,
      } as unknown as PrisonerPermissions

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonSentenceCalculationPermission.read],
      })

      await permissionsGuard(req, res, next)

      expectRequestAllowed(permissions)
    })

    it('request fails when a single permission check fails', async () => {
      const permissions = {
        ...setPrisonerPermission(PersonSentenceCalculationPermission.read, false),
        [PrisonerBasePermission.read]: true,
      } as unknown as PrisonerPermissions

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonSentenceCalculationPermission.read],
      })

      await permissionsGuard(req, res, next)

      expectRequestDenied([PersonSentenceCalculationPermission.read])
    })

    it('request fails when multiple permission checks fail', async () => {
      const permissions = {
        ...setPrisonerPermission(PersonSentenceCalculationPermission.read, false),
        [PrisonerBasePermission.read]: false,
      } as unknown as PrisonerPermissions

      permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

      permissionsGuard = prisonerPermissionsGuard(permissionsService, {
        requestDependentOn: [PrisonerBasePermission.read, PersonSentenceCalculationPermission.read],
      })

      await permissionsGuard(req, res, next)

      expectRequestDenied([PrisonerBasePermission.read, PersonSentenceCalculationPermission.read])
    })
  })

  it('request succeeds when a permission check fails if throwErrorOnDeniedPermission=false', async () => {
    const permissions = {
      ...setPrisonerPermission(PersonSentenceCalculationPermission.read, false),
      [PrisonerBasePermission.read]: true,
    } as unknown as PrisonerPermissions

    permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

    permissionsGuard = prisonerPermissionsGuard(permissionsService, {
      requestDependentOn: [PrisonerBasePermission.read, PersonSentenceCalculationPermission.read],
      throwErrorOnDeniedPermission: false,
    })

    await permissionsGuard(req, res, next)

    expectRequestDeniedWithoutError([PersonSentenceCalculationPermission.read])
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

      expectRequestAllowed(examplePermissions)
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

      expectRequestAllowed(examplePermissions)
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

function expectRequestAllowed(expected: PrisonerPermissions) {
  expect(next).toHaveBeenCalledWith()
  expect(req.middleware?.prisonerData).toEqual(prisonerMock)
  expect(res.locals.prisonerPermissions).toEqual(expected)
}

function expectRequestDenied(failedPermissionChecks: PrisonerPermission[]) {
  expect(next).toHaveBeenCalledWith(new PrisonerPermissionError('Denied permissions', failedPermissionChecks))
}

function expectRequestDeniedWithoutError(failedPermissionChecks: PrisonerPermission[]) {
  expect(next).toHaveBeenCalledWith()
  expect(req.middleware?.prisonerData).toBeUndefined()
  expect(req.middleware?.deniedPrisonerData).toEqual(prisonerMock)
  expect(res.locals.deniedPermissions).toEqual(failedPermissionChecks)
}
