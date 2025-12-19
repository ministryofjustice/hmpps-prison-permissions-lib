import PermissionsCheckContext from '../../../../PermissionsCheckContext'
import { PermissionStatus } from '../../../../../../../types/internal/permissions/PermissionStatus'
import { userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { PrisonerAdjudicationsPermission } from '../../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'
import { AdditionalPermissionRules, SituationalCheck } from '../../../../GetStatus'

const permission = PrisonerAdjudicationsPermission.read

// TODO hmm... not sure I like this...
const prisonerAdjudicationsRoleOverride: SituationalCheck = (user, _) => {
  return userHasSomeRolesFrom([Role.PomUser, Role.ReceptionUser], user)
    ? PermissionStatus.OK
    : PermissionStatus.ROLE_NOT_PRESENT
}

const prisonerAdjudicationsPermissionsRules: AdditionalPermissionRules = {
  ifRestrictedPatient: prisonerAdjudicationsRoleOverride,
  ifReleasedPrisoner: prisonerAdjudicationsRoleOverride,
  ifTransferringPrisoner: prisonerAdjudicationsRoleOverride,
  ifInPrisonOutsideCaseload: prisonerAdjudicationsRoleOverride,
}

const prisonerAdjudicationsReadCheck = (request: PermissionsCheckContext) =>
  matchBaseCheckAnd(request, permission, prisonerAdjudicationsPermissionsRules)

export default prisonerAdjudicationsReadCheck
