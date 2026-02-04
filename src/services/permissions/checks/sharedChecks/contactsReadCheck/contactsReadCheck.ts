import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'
import {
  isInUsersCaseLoad,
  isReleased,
  userHasSomeRolesFrom,
  wasReleasedWithinThreeYears,
} from '../../../utils/PermissionUtils'

const contactsReadCheck = matchBaseCheckAnd({
  overridingCondition: (user, prisoner) => {
    if (isReleased(prisoner)) {
      if (!userHasSomeRolesFrom([Role.ContactsAdministrator, Role.ContactsAuthoriser], user))
        return PermissionCheckStatus.ROLE_NOT_PRESENT
      if (!isInUsersCaseLoad(prisoner.previousPrisonId, user)) return PermissionCheckStatus.NOT_IN_CASELOAD
      if (!wasReleasedWithinThreeYears(prisoner)) return PermissionCheckStatus.NOT_PERMITTED
      return PermissionCheckStatus.OK
    }

    return isInUsersCaseLoad(prisoner.prisonId, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD
  },
})

export default contactsReadCheck
