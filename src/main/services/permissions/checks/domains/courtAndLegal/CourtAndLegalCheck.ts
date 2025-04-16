import { HmppsUser } from '../../../../../types/user/HmppsUser'
import Prisoner from '../../../../../data/hmppsPrisonerSearch/interfaces/Prisoner'
import PermissionsLogger from '../../../PermissionsLogger'
import { CourtAndLegalDomainPermissions } from '../../../../../types/permissions/domains/courtAndLegal/CourtAndLegalDomainPermissions'
import personCourtSchedulesCheck from './personCourtSchedules/PersonCourtSchedulesCheck'
import { PermissionCheckStatus } from '../../../../../types/permissions/PermissionCheckStatus'
import { PrisonerPermission } from '../../../../../types/permissions/prisoner/PrisonerPermissions'

export default function prisonerSpecificCheck(
  user: HmppsUser,
  prisoner: Prisoner,
  baseCheckStatus: PermissionCheckStatus,
  requestDependentOn: PrisonerPermission[],
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
