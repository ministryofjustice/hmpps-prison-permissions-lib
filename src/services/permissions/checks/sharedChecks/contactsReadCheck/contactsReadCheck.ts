import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { Role } from '../../../../../types/internal/user/Role'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'
import { isInUsersCaseLoad, userHasSomeRolesFrom, wasReleasedWithinThreeYears } from '../../../utils/PermissionUtils'

const contactsReadCheck = matchBaseCheckAnd({
  overridingCondition: (user, prisoner) => {
    if (isInUsersCaseLoad(prisoner.prisonId, user)) return PermissionCheckStatus.OK
    if (!userHasSomeRolesFrom([Role.ContactsAdministrator, Role.ContactsAuthoriser], user))
      return PermissionCheckStatus.ROLE_NOT_PRESENT
    if (!isInUsersCaseLoad(prisoner.previousPrisonId, user)) return PermissionCheckStatus.NOT_IN_CASELOAD
    if (!wasReleasedWithinThreeYears(prisoner)) return PermissionCheckStatus.NOT_PERMITTED
    return PermissionCheckStatus.OK
  },
})

export default contactsReadCheck
