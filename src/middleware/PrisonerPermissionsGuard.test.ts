import { NextFunction, Request, RequestHandler, Response } from 'express'
import prisonerPermissionsGuard from './PrisonerPermissionsGuard'
import { PrisonUser } from '../types/user/HmppsUser'
import PrisonerPermissionError from '../types/errors/PrisonerPermissionError'
import { prisonUserMock } from '../testUtils/UserMocks'
import { prisonerMock } from '../testUtils/PrisonerMocks'
import { PersonSentenceCalculationPermission } from '../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissions'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../types/permissions/prisoner/PrisonerPermissions'
import { PrisonerMoneyPermission } from '../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissions'
import { prisonerPermissionsMock } from '../testUtils/PrisonerPermissionsMock'
import { setPersonSentenceCalculationPermission } from '../types/permissions/domains/sentenceAndOffence/PersonSentenceCalculationPermissionsUtils'
import { setPrisonerMoneyPermission } from '../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissionsUtils'
import PermissionsService from '../services/permissions/PermissionsService'

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
      requestDependentOn                                      | grantedPermission
      ${PrisonerBasePermission.read}                          | ${{ [PrisonerBasePermission.read]: true }}
      ${PersonSentenceCalculationPermission.read}             | ${setPersonSentenceCalculationPermission(PersonSentenceCalculationPermission.read, true)}
      ${PersonSentenceCalculationPermission.edit_adjustments} | ${setPersonSentenceCalculationPermission(PersonSentenceCalculationPermission.edit_adjustments, true)}
      ${PrisonerMoneyPermission.read}                         | ${setPrisonerMoneyPermission(PrisonerMoneyPermission.read, true)}
    `(
      'requestDependentOn: $requestDependentOn successfully checked',
      async ({ requestDependentOn, grantedPermission }) => {
        await checkPermissionsGuard(grantedPermission, true)
        await checkPermissionsGuard(prisonerPermissionsMock, false) // by default these are denied permissions

        async function checkPermissionsGuard(permissions: PrisonerPermissions, expectSuccess: boolean) {
          permissionsGuard = prisonerPermissionsGuard(permissionsService, { requestDependentOn: [requestDependentOn] })
          permissionsService.getPrisonerPermissions = jest.fn(() => permissions)

          await permissionsGuard(req, res, next)

          if (expectSuccess) {
            expectRequestAllowed(permissions)
          } else {
            expectRequestDenied([requestDependentOn])
          }
        }
      },
    )
  })

  describe('multiple required permissions checked', () => {
    it('request succeeds when all permission checks pass', async () => {
      const permissions = {
        ...setPersonSentenceCalculationPermission(PersonSentenceCalculationPermission.read, true),
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
        ...setPersonSentenceCalculationPermission(PersonSentenceCalculationPermission.read, false),
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
        ...setPersonSentenceCalculationPermission(PersonSentenceCalculationPermission.read, false),
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

      expectRequestAllowed(examplePermissions)
      expectUserIsAKeyWorker()
    })

    it('checks if user is a key worker if no existing cache', async () => {
      permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))

      await permissionsGuard(req, res, next)

      expectRequestAllowed(examplePermissions)
      expectUserIsAKeyWorker()
    })

    it('checks if user is a key worker and adds to existing cache', async () => {
      permissionsService.isUserAKeyWorkerAtPrison = jest.fn(() => Promise.resolve(true))
      req.session.keyWorkerAtPrisons = { LEI: false }

      await permissionsGuard(req, res, next)

      expectRequestAllowed(examplePermissions)
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

function expectRequestAllowed(expected: PrisonerPermissions) {
  expect(next).toHaveBeenCalledWith()
  expect(req.middleware?.prisonerData).toEqual(prisonerMock)
  expect(res.locals.prisonerPermissions).toEqual(expected)
}

function expectRequestDenied(failedPermissionChecks: PrisonerPermission[]) {
  expect(next).toHaveBeenCalledWith(new PrisonerPermissionError('Denied permissions', failedPermissionChecks))
}

function expectUserIsAKeyWorker(expected: Record<string, boolean> = { MDI: true }) {
  expect(req.session.keyWorkerAtPrisons).toEqual(expected)
  expect((res.locals.user as PrisonUser).keyWorkerAtPrisons).toEqual(expected)
}
