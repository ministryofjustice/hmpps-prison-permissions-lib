import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

export const socReadScenarios = baseCheckAndUserHasSomeRolesFromScenarios([Role.SocCommunity, Role.SocCustody])
