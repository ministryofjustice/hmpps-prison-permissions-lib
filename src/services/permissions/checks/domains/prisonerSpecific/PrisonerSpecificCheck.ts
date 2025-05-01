import PermissionsCheckRequest from '../../PermissionsCheckRequest'
import { PrisonerSpecificDomainPermissions } from '../../../../../types/permissions/domains/prisonerSpecific/PrisonerSpecificDomainPermissions'
import prisonerMoneyCheck from './prisonerMoney/PrisonerMoneyCheck'

export default function prisonerSpecificCheck(request: PermissionsCheckRequest): PrisonerSpecificDomainPermissions {
  return {
    prisonerMoney: prisonerMoneyCheck(request),
  }
}
