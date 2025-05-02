import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { RunningAPrisonDomainPermissions } from '../../../../../types/permissions/domains/runningAPrison/RunningAPrisonDomainPermissions'
import prisonerVisitsAndVisitorsCheck from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsCheck'

export default function runningAPrisonCheck(request: PermissionsCheckRequest): RunningAPrisonDomainPermissions {
  return {
    prisonerVisitsAndVisitors: prisonerVisitsAndVisitorsCheck(request),
  }
}
