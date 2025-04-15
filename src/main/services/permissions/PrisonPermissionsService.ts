import UserService from '../UserService'
import PrisonApiClient from '../../data/prisonApi/PrisonApiClient'
import { HmppsUser } from '../../types/user/HmppsUser'
import PermissionsOptions from '../../types/permissions/PermissionsOptions'
import PermissionsLogger from './PermissionsLogger'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerBasePermission,
  PrisonerPermission,
  PrisonerPermissions,
} from '../../types/permissions/prisoner/PrisonerPermissions'
import baseCheck from './checks/baseCheck/BaseCheck'
import { PermissionCheckStatus } from '../../types/permissions/PermissionCheckStatus'
import courtAndLegalCheck from './checks/domains/courtAndLegal/CourtAndLegalCheck'

// TODO put staff roles on user session

export default class PrisonPermissionsService {
  userService: UserService

  permissionsLogger: PermissionsLogger

  constructor(permissionsOptions: PermissionsOptions) {
    const { prisonApiConfig, logger, telemetryClient } = {
      logger: console,
      ...permissionsOptions,
    }

    this.userService = new UserService(new PrisonApiClient(logger, prisonApiConfig))
    this.permissionsLogger = new PermissionsLogger(logger, telemetryClient)
  }

  public isUserAKeyWorker(token: string, user: HmppsUser): Promise<boolean> {
    return this.userService.isUserAKeyWorker(token, user)
  }

  static getPrisonerPermissions({
    user,
    prisoner,
    requestDependentOn,
    permissionsLogger,
  }: {
    user: HmppsUser
    prisoner: Prisoner
    requestDependentOn: PrisonerPermission[]
    permissionsLogger: PermissionsLogger
  }): PrisonerPermissions {
    const baseCheckStatus = baseCheck(user, prisoner)
    const basePermission = PrisonerBasePermission.read

    if (baseCheckStatus !== PermissionCheckStatus.OK && requestDependentOn.includes(basePermission)) {
      permissionsLogger.logPermissionCheckStatus(user, prisoner, basePermission, baseCheckStatus)
    }

    return {
      [PrisonerBasePermission.read]: baseCheckStatus === PermissionCheckStatus.OK,

      domainGroups: {
        courtAndLegal: courtAndLegalCheck(user, prisoner, baseCheckStatus, requestDependentOn, permissionsLogger),
      },
    } as PrisonerPermissions
  }
}
