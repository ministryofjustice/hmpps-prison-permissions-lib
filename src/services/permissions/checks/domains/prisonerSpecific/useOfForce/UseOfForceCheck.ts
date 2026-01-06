import PrisonerPermissionsContext from '../../../../../../types/internal/permissions/PrisonerPermissionsContext'
import useOfForceEditCheck from './useOfForceEdit/UseOfForceEditCheck'
import {
  UseOfForcePermission,
  UseOfForcePermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'
import { checkWith } from '../../../../utils/PermissionCheckUtils'

export default function useOfForceCheck(context: PrisonerPermissionsContext): UseOfForcePermissions {
  const check = checkWith(context)
  return {
    ...check(UseOfForcePermission.edit, useOfForceEditCheck),
  }
}
