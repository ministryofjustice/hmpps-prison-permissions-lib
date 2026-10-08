import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import { checkWith } from '../../../../utils/PermissionCheckUtils'
import {
  PrisonerPropertyPermission,
  PrisonerPropertyPermissions,
} from '../../../../../../types/public/permissions/domains/runningAPrison/prisonerProperty/PrisonerPropertyPermissions'
import readPropertyOverviewCheck from './readPropertyOverview/ReadPropertyOverviewCheck'
import { readPropertyDetailsCheck } from './readPropertyDetails/ReadPropertyDetailsCheck'
import editPropertyDetailsCheck from './editPropertyDetails/EditPropertyDetailsCheck'

export default function prisonerPropertyCheck(context: PrisonerPermissionsContext): PrisonerPropertyPermissions {
  const check = checkWith(context)
  return {
    ...check(PrisonerPropertyPermission.read_property_overview, readPropertyOverviewCheck),
    ...check(PrisonerPropertyPermission.read_property_details, readPropertyDetailsCheck),
    ...check(PrisonerPropertyPermission.edit_property_details, editPropertyDetailsCheck),
  }
}
