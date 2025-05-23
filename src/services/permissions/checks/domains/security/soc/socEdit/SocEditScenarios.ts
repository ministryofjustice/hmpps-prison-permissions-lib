import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const socEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.SocCustody,
  Role.SocCommunity,
  Role.SocDataAnalyst,
  Role.SocDataManager,
])
