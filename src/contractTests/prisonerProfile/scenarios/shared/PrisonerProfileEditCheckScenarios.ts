import baseCheckAndUserHasRoleScenarios from './BaseCheckAndUserHasRoleScenarios'
import { Role } from '../../../../types/internal/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const prisonerProfileEditCheckScenarios = baseCheckAndUserHasRoleScenarios(Role.DPSApplicationDeveloper)
