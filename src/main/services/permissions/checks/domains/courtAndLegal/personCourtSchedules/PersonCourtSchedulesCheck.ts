import { HmppsUser } from '../../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import PermissionsLogger from '../../../../PermissionsLogger'
import {
  PersonCourtSchedulesPermission,
  PersonCourtSchedulesPermissions,
} from '../../../../../../types/permissions/domains/courtAndLegal/PersonCourtSchedulesPermissions'
import courtScheduleReadCheck from './checks/CourtScheduleReadCheck'
import { PermissionCheckStatus } from '../../../../../../types/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../../../types/permissions/prisoner/PrisonerPermissions'

export default function personCourtScheduleCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermission[],
  permissionsLogger: PermissionsLogger,
): PersonCourtSchedulesPermissions {
  return {
    [PersonCourtSchedulesPermission.read_schedule]: courtScheduleReadCheck(
      user,
      prisoner,
      baseCheckStatus,
      requestDependentOn,
      permissionsLogger,
    ),
  }
}
