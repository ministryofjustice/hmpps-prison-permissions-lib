import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const socEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.SocCustody,
  Role.SocCommunity,
  Role.SocDataAnalyst,
  Role.SocDataManager,
])
