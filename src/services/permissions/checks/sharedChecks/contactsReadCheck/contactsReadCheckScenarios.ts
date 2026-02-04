import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../testUtils/TestScenario'
import { grantedCaseLoadCheckScenarios, grantedGlobalSearchCheckScenarios, grantedReleasedPrisonerCheckScenarios, grantedTransferringPrisonerCheckScenarios } from '../../baseCheck/BaseCheckScenarios'

const oldReleaseDate = new Date()
oldReleaseDate.setFullYear(oldReleaseDate.getFullYear() - 4) // 4 years ago
const recentReleaseDate = new Date()
recentReleaseDate.setFullYear(recentReleaseDate.getFullYear() - 2) // 2 years ago

export const deniedContactsReadScenarios: TestScenarios = new TestScenarios([])
  // Unreleased and not in caseload
  .andScenarioWhere(
    userWithActiveCaseLoad('OTHER')
      .withRoles([Role.InactiveBookings, Role.ContactsAdministrator])
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD),
  )
  // No released viewing role
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.ContactsAdministrator])
      .accessingReleasedPrisoner()
      .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED),
  )
  // No contacts role
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.InactiveBookings])
      .accessingReleasedPrisoner()
      .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT),
  )
  // Released more than 3 years ago
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.InactiveBookings, Role.ContactsAdministrator])
      .accessingReleasedPrisoner('KMI', oldReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.NOT_PERMITTED),
  )
  .and(grantedTransferringPrisonerCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))
  .and(grantedGlobalSearchCheckScenarios.withExpectedStatus(PermissionCheckStatus.NOT_IN_CASELOAD))

export const grantedContactsReadScenarios: TestScenarios = new TestScenarios([])
  // In prison and in caseload
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI').withRoles([]).accessingPrisonerAt('MDI').expectsStatus(PermissionCheckStatus.OK),
  )
  // Released within 3 years and Contacts Administrator Role
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.InactiveBookings, Role.ContactsAdministrator])
      .accessingReleasedPrisoner('KMI', recentReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.OK),
  )
  // Released within 3 years and Contacts Authoriser Role
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.InactiveBookings, Role.ContactsAuthoriser])
      .accessingReleasedPrisoner('KMI', recentReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.OK),
  )
  .and(grantedCaseLoadCheckScenarios)

export const contactsReadCheckScenarios = grantedContactsReadScenarios.and(deniedContactsReadScenarios)
