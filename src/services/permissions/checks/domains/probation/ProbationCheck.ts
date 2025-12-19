import PermissionsCheckContext from '../../PermissionsCheckContext'
import { ProbationDomainPermissions } from '../../../../../types/public/permissions/domains/probation/ProbationDomainPermissions'
import probationDocumentsCheck from './probationDocuments/ProbationDocumentsCheck'

export default function probationCheck(request: PermissionsCheckContext): ProbationDomainPermissions {
  return {
    probationDocuments: probationDocumentsCheck(request),
  }
}
