import type { NextFunction, Request, Response } from 'express'
import { checkPrisonerAccess, PrisonerPermission } from '../types/permissions/prisoner/PrisonerPermissions'
import PermissionsService from '../services/permissions/PermissionsService'
import PrisonerPermissionError from '../types/errors/PrisonerPermissionError'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'

export default function prisonerPermissionsGuard(
  permissionsService: PermissionsService,
  options: {
    requestDependentOn: PrisonerPermission[]
    getPrisonerNumberFunction?: (req: Request) => string | undefined
  },
) {
  const { requestDependentOn, getPrisonerNumberFunction = getPrisonerNumberFrom } = options

  if (!requestDependentOn?.length) throw Error('Unprotected route, must provide at least one dependent permission')

  return async (req: Request, res: Response, next: NextFunction) => {
    const prisonerData = await getPrisonerData(req, permissionsService, getPrisonerNumberFunction)
    if (!prisonerData) return next(Error('Could not retrieve prisoner data'))

    await populateKeyWorkerData(req, res, prisonerData, permissionsService)

    const prisonerPermissions = permissionsService.getPrisonerPermissions({
      user: res.locals.user,
      prisoner: prisonerData,
      requestDependentOn,
    })

    const failedChecks = requestDependentOn.filter(permission => !checkPrisonerAccess(permission, prisonerPermissions))

    if (failedChecks.length) return next(new PrisonerPermissionError('Failed permissions checks', failedChecks))

    req.middleware = { ...req.middleware, prisonerData }
    res.locals.prisonerPermissions = prisonerPermissions
    return next()
  }
}

function getPrisonerNumberFrom(req: Request): string | undefined {
  if (req.params?.prisonerNumber) {
    return req.params.prisonerNumber
  }
  if (req.query?.prisonerNumber) {
    return req.query.prisonerNumber as string
  }
  return undefined
}

async function getPrisonerData(
  req: Request,
  permissionsService: PermissionsService,
  getPrisonerNumberFunction: (req: Request) => string | undefined,
): Promise<Prisoner | undefined> {
  if (req.middleware?.prisonerData) return req.middleware?.prisonerData
  const prisonerNumber = getPrisonerNumberFunction(req)
  return prisonerNumber ? permissionsService.getPrisonerDetails(prisonerNumber) : undefined
}

async function populateKeyWorkerData(
  req: Request,
  res: Response,
  prisoner: Prisoner,
  permissionsService: PermissionsService,
): Promise<void> {
  if (res.locals.user?.authSource !== 'nomis') return

  const userCaseLoads = res.locals.user?.caseLoads?.map(caseLoad => caseLoad.caseLoadId)

  if (!req.session) throw new Error('User session required in order to cache key worker status')
  const keyWorkerAtPrisons = req.session.keyWorkerAtPrisons ?? {}

  if (
    prisoner.prisonId &&
    userCaseLoads?.includes(prisoner.prisonId) &&
    keyWorkerAtPrisons[prisoner.prisonId] === undefined
  ) {
    req.session.keyWorkerAtPrisons = {
      ...keyWorkerAtPrisons,
      [prisoner.prisonId]: await permissionsService.isUserAKeyWorkerAtPrison(
        res.locals.user.token!,
        res.locals.user,
        prisoner.prisonId,
      ),
    }
  }

  // This information is then provided to the user object on res.locals
  res.locals.user.keyWorkerAtPrisons = req.session.keyWorkerAtPrisons || {}
}
