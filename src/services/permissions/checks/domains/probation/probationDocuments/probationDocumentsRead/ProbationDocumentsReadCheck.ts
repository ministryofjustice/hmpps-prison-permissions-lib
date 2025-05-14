import PermissionsCheckRequest from '../../../../PermissionsCheckRequest'
import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, logDeniedPermissionCheck, userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { ProbationDocumentsPermission } from '../../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import releasedPrisonerStatus from '../../../../baseCheck/status/ReleasedPrisonerStatus'
import transferringPrisonerStatus from '../../../../baseCheck/status/TransferringPrisonerStatus'
import restrictedPatientStatus from '../../../../baseCheck/status/RestrictedPatientStatus'

const permission = ProbationDocumentsPermission.read

export default function probationDocumentsReadCheck(request: PermissionsCheckRequest) {
  const baseCheckPassed = request.baseCheckStatus === PermissionCheckStatus.OK

  const probationDocumentsCheckStatus = checkProbationDocumentsReadAccess(request)
  const probationDocumentsCheckPassed = probationDocumentsCheckStatus === PermissionCheckStatus.OK

  const check = baseCheckPassed && probationDocumentsCheckPassed

  if (!check) logDeniedPermissionCheck(permission, request, probationDocumentsCheckStatus)

  return check
}

function checkProbationDocumentsReadAccess(request: PermissionsCheckRequest): PermissionCheckStatus {
  const { user, prisoner } = request

  // User must firstly have one of the following roles:
  if (!userHasSomeRolesFrom([Role.PomUser, Role.ViewProbationDocuments], user)) {
    return PermissionCheckStatus.ROLE_NOT_PRESENT
  }

  // Restricted patients follow the base check rules:
  if (prisoner.restrictedPatient) return restrictedPatientStatus(user, prisoner)

  // Released prisoners follow the base check rules:
  if (prisoner.prisonId === 'OUT') return releasedPrisonerStatus(user)

  // Transferring prisoners follow the base check rules:
  if (prisoner.prisonId === 'TRN') return transferringPrisonerStatus(user)

  if (isInUsersCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.OK

  // Global search access is not allowed:
  return PermissionCheckStatus.NOT_IN_CASELOAD
}
