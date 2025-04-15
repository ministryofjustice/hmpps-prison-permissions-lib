import { HmppsUser } from '../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import {
  PrisonerPermission,
  PrisonerPermissionOperation,
} from '../../../../../types/permissions/prisoner/PrisonerPermissions'
import PermissionsLogger from '../../../PermissionsLogger'
import { CourtAndLegalDomainPermissions } from '../../../../../types/permissions/domains/courtAndLegal/CourtAndLegalDomainPermissions'
import personCourtSchedulesCheck from './personCourtSchedules/PersonCourtSchedulesCheck'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'

export default function courtAndLegalCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermissionOperation[],
  permissionsLogger: PermissionsLogger,
): CourtAndLegalDomainPermissions {
  return {
    personCourtSchedules: personCourtSchedulesCheck(
      user,
      prisoner,
      baseCheckStatus,
      requestDependentOn,
      permissionsLogger,
    ),
  }
}
