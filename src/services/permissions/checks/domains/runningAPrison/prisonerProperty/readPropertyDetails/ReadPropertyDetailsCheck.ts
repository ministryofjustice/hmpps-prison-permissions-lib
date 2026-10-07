import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { readPropertyOverviewConditions } from '../readPropertyOverview/ReadPropertyOverviewCheck'
import { PrisonerPermissionConditions } from '../../../../../PrisonerPermissionConditions'

/**
 * These rules determine whether a user can click through from the property overview to see further
 * property details for a prisoner including the property list, transfers and property history.
 */
export const readPropertyDetailsConditions: Partial<PrisonerPermissionConditions> = {
  // These rules inherit from the property overview check, with the additional condition on caseload:
  ...readPropertyOverviewConditions,

  // If the prisoner is in a prison that is not in the user's caseload,
  // the user is not permitted to view further property details.
  ifPrisonNotInCaseload: () => PermissionCheckStatus.NOT_IN_CASELOAD,
}

export const readPropertyDetailsCheck = matchBaseCheckAnd(readPropertyDetailsConditions)
