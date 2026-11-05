import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFromScenarios'

export const personPrisonCategoryEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.CreateCategorisation,
  Role.CreateRecategorisation,
  Role.ApproveCategorisation,
  Role.CategorisationSecurity,
])
