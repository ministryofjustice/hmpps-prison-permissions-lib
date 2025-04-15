import UserService from '../UserService'
import PrisonApiClient from '../../data/prisonApi/PrisonApiClient'
import { HmppsUser } from '../../types/user/HmppsUser'
import Prisoner from '../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerBasePermission,
  PrisonerPermissionOperation,
  PrisonerPermissions,
} from '../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsOptions from '../../types/permissions/PermissionsOptions'
import baseCheck from './checks/baseCheck/BaseCheck'
import PermissionsLogger from './PermissionsLogger'
import courtAndLegalCheck from './checks/domains/courtAndLegal/CourtAndLegalCheck'

// put staff roles on user session

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
}
