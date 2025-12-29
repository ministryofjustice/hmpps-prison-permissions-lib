import PrisonerPermissionsContext from '../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { RunningAPrisonDomainPermissions } from '../../../../../types/public/permissions/domains/runningAPrison/RunningAPrisonDomainPermissions'
import prisonerVisitsAndVisitorsCheck from './prisonerVisitsAndVisitors/PrisonerVisitsAndVisitorsCheck'
import prisonerBaseLocationCheck from './prisonerBaseLocation/PrisonerBaseLocationCheck'

export default function runningAPrisonCheck(context: PrisonerPermissionsContext): RunningAPrisonDomainPermissions {
  return {
    prisonerVisitsAndVisitors: prisonerVisitsAndVisitorsCheck(context),
    prisonerBaseLocation: prisonerBaseLocationCheck(context),
  }
}
