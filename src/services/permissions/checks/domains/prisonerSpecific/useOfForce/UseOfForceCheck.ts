import PermissionsCheckContext from '../../../PermissionsCheckContext'
import useOfForceEditCheck from './useOfForceEdit/UseOfForceEditCheck'
import {
  UseOfForcePermission,
  UseOfForcePermissions,
} from '../../../../../../types/public/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'

export default function useOfForceCheck(request: PermissionsCheckContext): UseOfForcePermissions {
  return {
    [UseOfForcePermission.edit]: useOfForceEditCheck(request),
  }
}
