import baseCheckAndUserHasSomeRolesFromScenarios from '../../../shared/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../types/internal/user/Role'

export const socEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.SocCustody,
  Role.SocCommunity,
  Role.SocDataAnalyst,
  Role.SocDataManager,
])
