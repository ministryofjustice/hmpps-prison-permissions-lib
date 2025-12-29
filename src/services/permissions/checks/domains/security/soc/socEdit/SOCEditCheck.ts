import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const socEditCheck = baseCheckAndUserHasSomeRolesFrom([
  Role.SocCustody,
  Role.SocCommunity,
  Role.SocDataAnalyst,
  Role.SocDataManager,
])

export default socEditCheck
