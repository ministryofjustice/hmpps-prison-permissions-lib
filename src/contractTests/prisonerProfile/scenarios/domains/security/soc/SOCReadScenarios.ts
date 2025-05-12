import { Role } from '../../../../../../types/user/Role'
import baseCheckAndUserHasSomeRolesFromScenarios from '../../../shared/BaseCheckAndUserHasSomeRolesFromScenarios'

// eslint-disable-next-line import/prefer-default-export
export const socReadScenarios = baseCheckAndUserHasSomeRolesFromScenarios([Role.SocCommunity, Role.SocCustody])
