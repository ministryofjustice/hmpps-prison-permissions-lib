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
  },
) {
  const { requestDependentOn, getPrisonerNumberFunction = getPrisonerNumberFrom } = options

  if (!requestDependentOn?.length) throw Error('Unprotected route, must provide at least one dependent permission')

  return async (req: Request, res: Response, next: NextFunction) => {
    const prisonerData = await getPrisonerData(req, permissionsService, getPrisonerNumberFunction)
    if (!prisonerData) return next(Error('Could not retrieve prisoner data'))

    /*
     * Currently avoiding adding a dependency on the hmpps-person-record API and will just check to
     * see if any duplicate prisoner records are present in the request middleware, which is up to the implementing
     * service to provide if they wish to support permission upgrades based on duplicate records.
     */
    const duplicateRecords = req.middleware?.duplicatePrisonerData || []

    const prisonerPermissions = permissionsService.getPrisonerPermissions({
      user: res.locals.user,
      prisoner: prisonerData,
      requestDependentOn,
      duplicateRecords,
    })

    const deniedPermissions = requestDependentOn.filter(permission => !isGranted(permission, prisonerPermissions))

    if (deniedPermissions.length) return next(new PrisonerPermissionError('Denied permissions', deniedPermissions))

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
