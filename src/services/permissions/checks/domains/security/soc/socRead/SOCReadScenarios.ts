import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const socReadScenarios = baseCheckAndUserHasSomeRolesFromScenarios([Role.SocCommunity, Role.SocCustody])
