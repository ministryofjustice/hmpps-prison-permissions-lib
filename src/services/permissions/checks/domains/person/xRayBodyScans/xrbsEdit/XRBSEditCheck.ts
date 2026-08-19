import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const xrbsEditCheck = baseCheckAndUserHasSomeRolesFrom([Role.Prison, Role.DpsApplicationDeveloper])

export default xrbsEditCheck
