import type { NextFunction, Request, Response } from 'express'
import { PrisonerPermission } from '../types/public/permissions/prisoner/PrisonerPermissions'
import PermissionsService from '../services/permissions/PermissionsService'
import PrisonerPermissionError from '../types/public/errors/PrisonerPermissionError'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { isGranted } from '../types/public/permissions/prisoner/PrisonerPermissionsUtils'

export default function prisonerPermissionsGuard(
  permissionsService: PermissionsService,
  options: {
    requestDependentOn: PrisonerPermission[]
    getPrisonerNumberFunction?: (req: Request) => string | undefined
    throwErrorOnDeniedPermission?: boolean
  },
) {
  const {
    requestDependentOn,
    getPrisonerNumberFunction = getPrisonerNumberFrom,
    throwErrorOnDeniedPermission = true,
  } = options

  if (!requestDependentOn?.length) throw Error('Unprotected route, must provide at least one dependent permission')

  return async (req: Request, res: Response, next: NextFunction) => {
    const prisonerData = await getPrisonerData(req, permissionsService, getPrisonerNumberFunction)
    if (!prisonerData) return next(Error('Could not retrieve prisoner data'))

    const prisonerPermissions = permissionsService.getPrisonerPermissions({
      user: res.locals.user,
      prisoner: prisonerData,
      requestDependentOn,
    })

    const deniedPermissions = requestDependentOn.filter(permission => !isGranted(permission, prisonerPermissions))

    if (deniedPermissions.length) {
      if (throwErrorOnDeniedPermission) {
        return next(new PrisonerPermissionError('Denied permissions', deniedPermissions))
      }
      res.locals.deniedPermissions = deniedPermissions
      res.locals.prisonerPermissions = prisonerPermissions
      const { prisonerData: _, ...middleware } = req.middleware ?? {}
      req.middleware = middleware
      return next()
    }

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
