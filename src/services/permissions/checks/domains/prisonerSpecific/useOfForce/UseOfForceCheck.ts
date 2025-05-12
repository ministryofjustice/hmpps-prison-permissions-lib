import PermissionsCheckRequest from '../../../PermissionsCheckRequest'
import useOfForceEditCheck from './useOfForceEdit/UseOfForceEditCheck'
import {
  UseOfForcePermission,
  UseOfForcePermissions,
} from '../../../../../../types/permissions/domains/prisonerSpecific/useOfForce/UseOfForcePermissions'

export default function useOfForceCheck(request: PermissionsCheckRequest): UseOfForcePermissions {
  return {
    [UseOfForcePermission.edit]: useOfForceEditCheck(request),
  }
}
