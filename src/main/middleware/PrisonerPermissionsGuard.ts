import type { NextFunction, Request, Response } from 'express'
import {
  PrisonerBasePermission,
  prisonerPermission,
  PrisonerPermissionOperation,
  PrisonerPermissions,
} from '../types/permissions/prisoner/PrisonerPermissions'
import { HmppsUser } from '../types/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import baseCheck from '../services/permissions/checks/baseCheck/BaseCheck'
import courtAndLegalCheck from '../services/permissions/checks/domains/courtAndLegal/CourtAndLegalCheck'
import PermissionsLogger from '../services/permissions/PermissionsLogger'
import { PermissionCheckStatus } from '../types/permissions/PermissionCheckStatus'
import { Operation } from '../types/permissions/Operations'

export default function prisonerPermissionsGuard(requestDependentOn: PrisonerPermissionOperation[] = []) {
  if (!requestDependentOn?.length) throw Error('Unprotected route')

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.middleware?.prisonerData) return next(new Error('No prisonerData found in middleware'))
    if (!req.middleware?.permissionsLogger) return next(new Error('No permissionsLogger found in middleware'))

    const prisonerPermissions = getPrisonerPermissions({
      user: res.locals.user,
      prisoner: req.middleware?.prisonerData,
      requestDependentOn,
      permissionsLogger: req.middleware?.permissionsLogger,
    })

    const failedChecks = requestDependentOn.some(
      permissionOperation =>
        !prisonerPermission(permissionOperation.permission, prisonerPermissions)[permissionOperation.operation],
    )

    if (failedChecks) return next(new Error('Failed permissions checks'))

    res.locals.prisonerPermissions = prisonerPermissions

    return next()
  }
}

function getPrisonerPermissions({
  user,
  prisoner,
  requestDependentOn,
  permissionsLogger,
}: {
  user: HmppsUser
  prisoner: Prisoner
  requestDependentOn: PrisonerPermissionOperation[]
  permissionsLogger: PermissionsLogger
}): PrisonerPermissions {
  const baseCheckStatus = baseCheck(user, prisoner)
  const basePermissionOperation = { permission: PrisonerBasePermission.basic, operation: Operation.read }

  if (baseCheckStatus !== PermissionCheckStatus.OK && requestDependentOn.includes(basePermissionOperation)) {
    permissionsLogger.logPermissionCheckStatus(user, prisoner, basePermissionOperation, baseCheckStatus)
  }

  return {
    [PrisonerBasePermission.basic]: { read: baseCheckStatus === PermissionCheckStatus.OK },

    domainGroups: {
      courtAndLegal: courtAndLegalCheck(user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger),
    },
  }
}
