import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const pathfinderEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.PathfinderApproval,
  Role.PathfinderStdPrison,
  Role.PathfinderStdProbation,
  Role.PathfinderHQ,
  Role.PathfinderUser,
])
