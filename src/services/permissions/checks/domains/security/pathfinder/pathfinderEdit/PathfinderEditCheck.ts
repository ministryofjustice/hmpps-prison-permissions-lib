import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const pathfinderEditCheck = baseCheckAndUserHasSomeRolesFrom([
  Role.PathfinderApproval,
  Role.PathfinderStdPrison,
  Role.PathfinderStdProbation,
  Role.PathfinderHQ,
  Role.PathfinderUser,
])

export default pathfinderEditCheck
