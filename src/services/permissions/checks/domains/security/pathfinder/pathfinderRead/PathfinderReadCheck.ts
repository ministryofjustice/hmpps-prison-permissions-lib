import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const pathfinderReadCheck = baseCheckAndUserHasSomeRolesFrom([
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

export default pathfinderReadCheck
