import { CourtAndLegalDomainPermissions } from '../../../../../types/permissions/domains/courtAndLegal/CourtAndLegalDomainPermissions'
import personCourtScheduleCheck from './personCourtSchedules/PersonCourtSchedulesCheck'
import PermissionsCheckRequest from '../../PermissionsCheckRequest'

export default function courtAndLegalCheck(request: PermissionsCheckRequest): CourtAndLegalDomainPermissions {
  return {
    personCourtSchedules: personCourtScheduleCheck(request),
  }
}
