import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasSomeRolesFrom from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFrom'

const personPrisonCategoryEditCheck = baseCheckAndUserHasSomeRolesFrom([
  Role.CreateCategorisation,
  Role.CreateRecategorisation,
  Role.ApproveCategorisation,
  Role.CategorisationSecurity,
])

export default personPrisonCategoryEditCheck
