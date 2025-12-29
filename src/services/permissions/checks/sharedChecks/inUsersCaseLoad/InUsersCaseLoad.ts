import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { matchBaseCheckAnd } from '../../../utils/PermissionCheckUtils'
import { isInUsersCaseLoad } from '../../../utils/PermissionUtils'

const inUsersCaseLoad = matchBaseCheckAnd({
  overridingCondition: (user, prisoner) =>
    isInUsersCaseLoad(prisoner.prisonId, user) ? PermissionCheckStatus.OK : PermissionCheckStatus.NOT_IN_CASELOAD,
})

export default inUsersCaseLoad
