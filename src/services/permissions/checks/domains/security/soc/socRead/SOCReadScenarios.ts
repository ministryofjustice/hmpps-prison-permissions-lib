import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndInUsersCaseLoad/BaseCheckAndUserHasSomeRolesFromScenarios'
import { Role } from '../../../../../../../types/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const socReadScenarios = baseCheckAndUserHasSomeRolesFromScenarios([Role.SocCommunity, Role.SocCustody])
