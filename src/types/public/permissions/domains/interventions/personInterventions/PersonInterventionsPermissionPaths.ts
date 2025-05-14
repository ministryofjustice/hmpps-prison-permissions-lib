import { PrisonerPermissions } from '../../../prisoner/PrisonerPermissions'
import { Path } from '../../../../../internal/utils/Path'
import { PersonInterventionsPermission } from './PersonInterventionsPermissions'

// eslint-disable-next-line import/prefer-default-export
export const personInterventionsPermissionPaths: Record<PersonInterventionsPermission, Path<PrisonerPermissions>> = {
  [PersonInterventionsPermission.read_csip]: `domainGroups.interventions.personInterventions.${PersonInterventionsPermission.read_csip}`,
}
