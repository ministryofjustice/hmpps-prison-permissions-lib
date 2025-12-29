import { Role } from '../../../../../../../types/internal/user/Role'
import baseCheckAndUserHasSomeRolesFromScenarios from '../../../../sharedChecks/baseCheckAndUserHasSomeRolesFrom/BaseCheckAndUserHasSomeRolesFromScenarios'

// eslint-disable-next-line import/prefer-default-export
export const personPrisonCategoryEditScenarios = baseCheckAndUserHasSomeRolesFromScenarios([
  Role.CreateCategorisation,
  Role.CreateRecategorisation,
  Role.ApproveCategorisation,
  Role.CategorisationSecurity,
])
