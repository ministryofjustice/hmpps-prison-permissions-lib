import baseCheckAndUserHasRoleScenarios from '../../../shared/BaseCheckAndUserHasRoleScenarios'
import { Role } from '../../../../../../types/user/Role'

// eslint-disable-next-line import/prefer-default-export
export const sensitiveCaseNotesDeleteScenarios = baseCheckAndUserHasRoleScenarios(Role.DeleteSensitiveCaseNotes)
