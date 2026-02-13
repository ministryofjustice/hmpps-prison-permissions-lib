import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import {
  PersonInterventionsPermission,
  PersonInterventionsPermissions,
} from '../../../../../../types/public/permissions/domains/interventions/personInterventions/PersonInterventionsPermissions'
import inUsersCaseLoad from '../../../sharedChecks/inUsersCaseLoad/InUsersCaseLoad'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function personInterventionsCheck(context: PrisonerPermissionsContext): PersonInterventionsPermissions {
  const check = checkWith(context)
  return {
    ...check(PersonInterventionsPermission.read_csip, inUsersCaseLoad),
    ...check(PersonInterventionsPermission.edit_csip, inUsersCaseLoad),
  }
}
