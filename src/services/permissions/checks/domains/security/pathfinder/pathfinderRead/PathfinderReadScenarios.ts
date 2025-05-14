import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const pathfinderReadScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.PathfinderApproval,
  Role.PathfinderStdPrison,
  Role.PathfinderStdProbation,
  Role.PathfinderHQ,
  Role.PathfinderUser,
  Role.PathfinderLocalReader,
  Role.PathfinderNationalReader,
  Role.PathfinderPolice,
  Role.PathfinderPsychologist,
])
