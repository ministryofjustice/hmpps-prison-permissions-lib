import {
  isPersonDomainPermission,
  personDomainPermission,
  PersonDomainPermission,
  PersonDomainPermissions,
} from '../domains/person/PersonDomainPermissions'
import {
  isPersonPlanAndNeedsDomainPermission,
  personPlanAndNeedsDomainPermission,
  PersonPlanAndNeedsDomainPermission,
  PersonPlanAndNeedsDomainPermissions,
} from '../domains/personPlanAndNeeds/PersonPlanAndNeedsDomainPermissions'
import { Operations, noAccess, Operation } from '../Operations'
import {
  courtAndLegalDomainPermission,
  CourtAndLegalDomainPermission,
  CourtAndLegalDomainPermissions,
  isCourtAndLegalDomainPermission,
} from '../domains/courtAndLegal/CourtAndLegalDomainPermissions'

// middleware:
// function prisonerPermissionsCheck(pageLoadDependentOn: PrisonerPermissions[])

// nunjucks needs a method / methods to use to get permissions... so the permissions handle can't be a complex obj

export enum PrisonerBasePermission {
  basic = 'prisoner:basic',
}

/**
 * These permissions define what a HMPPS user can do with respect to data held about a prisoner.
 */
export interface PrisonerPermissions {
  // other 'base' record permissions such as permission to merge records? I suppose this puts two prisoners in context...
  [PrisonerBasePermission.basic]: Operations

  domainGroups: {
    // Not a full list, for demonstration purposes at the moment:
    // person: PersonDomainPermissions
    // personPlanAndNeeds: PersonPlanAndNeedsDomainPermissions
    courtAndLegal: CourtAndLegalDomainPermissions
  }
}

export type PrisonerPermission =
  | PrisonerBasePermission // PrisonerBaseResource
  | CourtAndLegalDomainPermission
  | PersonDomainPermission
  | PersonPlanAndNeedsDomainPermission

// TODO: is this actually the PrisonerPermission:
export type PrisonerPermissionOperation = {
  permission: PrisonerPermission // And this is the subresource
  operation: Operation // And this the operation or action
}

export function prisonerPermission(permission: PrisonerPermission, permissions: PrisonerPermissions): Operations {
  if (permission === PrisonerBasePermission.basic) {
    return permissions[PrisonerBasePermission.basic]
  }

  if (isCourtAndLegalDomainPermission(permission as string, permissions.domainGroups.courtAndLegal)) {
    return courtAndLegalDomainPermission(
      permission as CourtAndLegalDomainPermission,
      permissions.domainGroups.courtAndLegal,
    )
  }

  // if (isPersonDomainPermission(permission as string, permissions.domainGroups.person)) {
  //   return personDomainPermission(permission as PersonDomainPermission, permissions.domainGroups.person)
  // }

  // if (isPersonPlanAndNeedsDomainPermission(permission as string, permissions.domainGroups.personPlanAndNeeds)) {
  //   return personPlanAndNeedsDomainPermission(
  //     permission as PersonPlanAndNeedsDomainPermission,
  //     permissions.domainGroups.personPlanAndNeeds,
  //   )
  // }

  return noAccess()
}
