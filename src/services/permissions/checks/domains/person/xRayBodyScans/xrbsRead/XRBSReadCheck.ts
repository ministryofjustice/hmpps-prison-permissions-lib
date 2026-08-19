import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'
import { Role } from '../../../../../../../types/internal/user/Role'

const xrbsReadCheck = baseCheckAndUserHasSomeRolesFrom([Role.Prison, Role.DpsApplicationDeveloper])

export default xrbsReadCheck
