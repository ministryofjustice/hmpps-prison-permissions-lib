import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { Role } from '../../../../../../../types/internal/user/Role'
import { ProbationDocumentsPermission } from '../../../../../../../types/public/permissions/domains/probation/probationDocuments/ProbationDocumentsPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const permission = ProbationDocumentsPermission.read

export default function probationDocumentsReadCheck(context: PermissionsCheckContext) {
  return matchBaseCheckAnd(context, permission, {
    atLeastOneRoleRequiredFrom: [Role.PomUser, Role.ViewProbationDocuments],
    ifInPrisonOutsideCaseload: (_, __) => PermissionStatus.NOT_IN_CASELOAD,
  })
}
