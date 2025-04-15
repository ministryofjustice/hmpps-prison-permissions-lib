import type { NextFunction, Request, Response } from 'express'
import { checkPrisonerAccess, PrisonerPermission } from '../types/permissions/prisoner/PrisonerPermissions'
import PrisonPermissionsService from '../services/permissions/PrisonPermissionsService'
import PrisonerPermissionError from '../types/errors/PrisonerPermissionError'

export default function prisonerPermissionsGuard({ requestDependentOn }: { requestDependentOn: PrisonerPermission[] }) {
  if (!requestDependentOn?.length) throw Error('Unprotected route, must provide at least one dependent permission')

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.middleware?.prisonerData) return next(new Error('No prisonerData found in middleware'))
    if (!req.middleware?.permissionsLogger) return next(new Error('No permissionsLogger found in middleware'))

    const prisonerPermissions = PrisonPermissionsService.getPrisonerPermissions({
      user: res.locals.user,
      prisoner: req.middleware?.prisonerData,
      requestDependentOn,
      permissionsLogger: req.middleware?.permissionsLogger,
    })

    const failedChecks = requestDependentOn.filter(permission => !checkPrisonerAccess(permission, prisonerPermissions))

    if (failedChecks.length) return next(new PrisonerPermissionError('Failed permissions checks', failedChecks))

    res.locals.prisonerPermissions = prisonerPermissions
    return next()
  }
}
