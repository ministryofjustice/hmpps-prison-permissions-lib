import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const socReadCheck = baseCheckAndUserHasSomeRolesFrom([Role.SocCommunity, Role.SocCustody])

export default socReadCheck
