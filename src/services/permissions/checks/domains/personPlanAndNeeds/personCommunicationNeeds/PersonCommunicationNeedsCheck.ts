import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import baseCheck from '../../../baseCheck/BaseCheck'
import prisonerProfileEditCheck from '../../../sharedChecks/prisonerProfileEditCheck/PrisonerProfileEditCheck'
import {
  PersonCommunicationNeedsPermission,
  PersonCommunicationNeedsPermissions,
} from '../../../../../../types/public/permissions/domains/personPlanAndNeeds/personCommunicationNeeds/PersonCommunicationNeedsPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personCommunicationNeedsCheck(
  context: PrisonerPermissionsContext,
): PersonCommunicationNeedsPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonCommunicationNeedsPermission.read_language, baseCheck),
    ...check(PersonCommunicationNeedsPermission.edit_language, prisonerProfileEditCheck),
  }
}
