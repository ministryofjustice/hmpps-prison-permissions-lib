import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PersonHealthAndMedicationPermission } from '../../../../../../../types/public/permissions/domains/person/personHealthAndMedication/PersonHealthAndMedicationPermissions'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isActiveCaseLoad, logDeniedPermissionCheck, userHasRole } from '../../../../../utils/PermissionUtils'

const permission = PersonHealthAndMedicationPermission.edit_diet

export default function dietEditCheck(request: PermissionsCheckRequest) {
  const { user, prisoner, baseCheckStatus } = request

  const baseCheckPassed = baseCheckStatus === PermissionCheckStatus.OK
  const inActiveCaseLoad = isActiveCaseLoad(prisoner.prisonId, user)
  const hasRole = userHasRole(Role.DietAndAllergiesEdit, user)

  const check = baseCheckPassed && inActiveCaseLoad && hasRole

  if (!check)
    logDeniedPermissionCheck(
      permission,
      request,
      inActiveCaseLoad ? PermissionCheckStatus.ROLE_NOT_PRESENT : PermissionCheckStatus.NOT_ACTIVE_CASELOAD,
    )

  return check
}
