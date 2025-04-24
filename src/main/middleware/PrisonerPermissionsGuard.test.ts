import { Request, Response, NextFunction, RequestHandler } from 'express'
import { PermissionsService, PrisonerBasePermission } from '../index'
import prisonerPermissionsGuard from './PrisonerPermissionsGuard'
import { prisonerMock } from '../../test/prisonerMocks'
import { PrisonUser } from '../types/user/HmppsUser'
import { userMDI } from '../../test/userMocks'
import PrisonerPermissionError from '../types/errors/PrisonerPermissionError'

const expectedPermissions = {
  [PrisonerBasePermission.read]: true,
}

let req: Request
let res: Response
let next: NextFunction

describe('PrisonerPermissionsGuard', () => {
  let permissionsService: PermissionsService

  let permissionsGuard: RequestHandler

  beforeEach(() => {
    res = { locals: { user: userMDI } } as Response
    req = { params: { prisonerNumber: prisonerMock.prisonerNumber }, session: {}, middleware: {} } as unknown as Request
    next = jest.fn()

    permissionsService = {
      getPrisonerPermissions: jest.fn(),
      isUserAKeyWorkerAtPrison: jest.fn(),
      getPrisonerDetails: jest.fn(),
    } as unknown as PermissionsService

    permissionsGuard = prisonerPermissionsGuard(permissionsService, {
      requestDependentOn: [PrisonerBasePermission.read],
    })
  })

  describe('permissions check succeeds', () => {
    beforeEach(() => {
      permissionsService.getPrisonerPermissions = jest.fn(() => ({ [PrisonerBasePermission.read]: true }))
    })

    describe('prisoner data already available', () => {
      beforeEach(() => {
        req.middleware = { prisonerData: prisonerMock }
      })

      it('sets permissions and calls next()', async () => {
        await permissionsGuard(req, res, next)

        expectPermissionsCheckSucceeds()
      })
    })

    describe('prisoner data retrieved from prisoner search', () => {
      beforeEach(() => {
        permissionsService.getPrisonerDetails = jest.fn(() => Promise.resolve(prisonerMock))
      })

      it('sets permissions and calls next()', async () => {
        await permissionsGuard(req, res, next)

        expectPermissionsCheckSucceeds()
      })
    })

    describe(`checks are made to see if user is a key worker at the prisoner's prison`, () => {
      beforeEach(() => {
        req.middleware = { prisonerData: prisonerMock }
      })

      it('uses the existing cache', async () => {
        req.session.keyWorkerAtPrisons = { MDI: true }

        await permissionsGuard(req, res, next)

        expectPermissionsCheckSucceeds()
        expectUserIsAKeyWorker()
      })

      it('checks if user is a key worker if no existing cache', async () => {
        permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))

        await permissionsGuard(req, res, next)

        expectPermissionsCheckSucceeds()
        expectUserIsAKeyWorker()
      })

      it('checks if user is a key worker and adds to existing cache', async () => {
        permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))
        req.session.keyWorkerAtPrisons = { LEI: false }

        await permissionsGuard(req, res, next)

        expectPermissionsCheckSucceeds()
        expectUserIsAKeyWorker({ LEI: false, MDI: true })
      })
    })
  })

  describe('permissions check fails', () => {
    it('no permissions listed as dependent', () => {
      expect(() => prisonerPermissionsGuard(permissionsService, { requestDependentOn: [] })).toThrow(
        'Unprotected route, must provide at least one dependent permission',
      )
    })

    it('propagates a PrisonerPermissionError when required permission check is false', async () => {
      permissionsService.getPrisonerPermissions = jest.fn(() => ({ [PrisonerBasePermission.read]: false }))
      req.middleware = { prisonerData: prisonerMock }

      await permissionsGuard(req, res, next)

      expect(next).toHaveBeenCalledWith(
        new PrisonerPermissionError('Failed permissions checks', [PrisonerBasePermission.read]),
      )
    })
  })
})

function expectPermissionsCheckSucceeds(expected = expectedPermissions) {
  expect(next).toHaveBeenCalled()
  expect(req.middleware?.prisonerData).toEqual(prisonerMock)
  expect(req.middleware?.prisonerData).toEqual(prisonerMock)
  expect(res.locals.prisonerPermissions).toEqual(expected)
}

function expectUserIsAKeyWorker(expected: Record<string, boolean> = { MDI: true }) {
  expect(req.session.keyWorkerAtPrisons).toEqual(expected)
  expect((res.locals.user as PrisonUser).keyWorkerAtPrisons).toEqual(expected)
}
