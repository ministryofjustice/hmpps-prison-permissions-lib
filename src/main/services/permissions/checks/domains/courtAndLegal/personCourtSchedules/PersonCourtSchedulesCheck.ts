import { HmppsUser } from '../../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerPermission,
  PrisonerPermissionOperation,
} from '../../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../../../../PermissionsLogger'
import {
  PersonCourtSchedulesPermission,
  PersonCourtSchedulesPermissions,
} from '../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import courtScheduleCheck from './checks/CourtScheduleCheck'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'

export default function personCourtScheduleCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermissionOperation[],
  permissionsLogger: PermissionsLogger,
): PersonCourtSchedulesPermissions {
  return {
    [PersonCourtSchedulesPermission.schedule]: courtScheduleCheck(
      user,
      prisoner,
      baseCheckStatus,
      requestDependentOn,
      permissionsLogger,
    ),
  }
}
