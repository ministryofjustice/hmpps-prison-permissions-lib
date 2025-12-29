import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import prisonerAdjudicationsReadCheck from './prisonerAdjudicationsRead/PrisonerAdjudicationsReadCheck'
import {
  PrisonerAdjudicationsPermission,
  PrisonerAdjudicationsPermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function prisonerAdjudicationsCheck(
  context: PrisonerPermissionsContext,
): PrisonerAdjudicationsPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerAdjudicationsPermission.read, prisonerAdjudicationsReadCheck),
  }
}
