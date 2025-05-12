import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { ProbationDomainPermissions } from '../../../../../types/permissions/domains/probation/ProbationDomainPermissions'
import probationDocumentsCheck from './probationDocuments/ProbationDocumentsCheck'

export default function probationCheck(request: PermissionsCheckRequest): ProbationDomainPermissions {
  return {
    probationDocuments: probationDocumentsCheck(request),
  }
}
