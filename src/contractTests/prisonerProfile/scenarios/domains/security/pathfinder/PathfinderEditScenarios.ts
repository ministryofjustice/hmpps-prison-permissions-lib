import baseCheckAndUserHasSomeRolesFromScenarios from '../../../shared/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../types/internal/user/Role'

export const pathfinderEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.PathfinderApproval,
  Role.PathfinderStdPrison,
  Role.PathfinderStdProbation,
  Role.PathfinderHQ,
  Role.PathfinderUser,
])
