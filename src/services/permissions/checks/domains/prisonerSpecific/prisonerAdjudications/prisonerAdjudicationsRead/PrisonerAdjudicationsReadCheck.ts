import { PermissionCheckStatus } from '../../../../../../../types/internal/permissions/PermissionCheckStatus'
import { isInUsersCaseLoad, userHasSomeRolesFrom } from '../../../../../utils/PermissionUtils'
import { Role } from '../../../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../../../utils/PermissionCheckUtils'

const prisonerAdjudicationsReadCheck = matchBaseCheckAnd({
  overridingCondition: (user, prisoner) =>
    isInUsersCaseLoad(prisoner.prisonId, user) || userHasSomeRolesFrom([Role.PomUser, Role.ReceptionUser], user)
      ? PermissionCheckStatus.OK
      : PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default prisonerAdjudicationsReadCheck
