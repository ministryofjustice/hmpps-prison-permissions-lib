import { Role } from '../../../../../types/internal/user/Role'
import { PermissionCheckStatus } from '../../../../../types/internal/permissions/PermissionCheckStatus'
import { TestScenarios, userWithActiveCaseLoad } from '../../../../../testUtils/TestScenario'

const oldReleaseDate = new Date()
oldReleaseDate.setFullYear(oldReleaseDate.getFullYear() - 4) // 4 years ago
const recentReleaseDate = new Date()
recentReleaseDate.setFullYear(recentReleaseDate.getFullYear() - 2) // 2 years ago

export const deniedContactsReadScenarios: TestScenarios = new TestScenarios([])
  // Unreleased and not in caseload
  .andScenarioWhere(
    userWithActiveCaseLoad('OTHER')
      .withRoles([Role.ReleasedPrisonerViewing, Role.ContactsAdministrator])
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionCheckStatus.NOT_IN_CASELOAD)
  )
  // No released viewing role
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.ContactsAdministrator])
      .accessingReleasedPrisoner()
      .expectsStatus(PermissionCheckStatus.PRISONER_IS_RELEASED)
  )
  // No contacts role
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([Role.ReleasedPrisonerViewing])
      .accessingReleasedPrisoner()
      .expectsStatus(PermissionCheckStatus.ROLE_NOT_PRESENT)
  )
  // Released more than 3 years ago
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.ReleasedPrisonerViewing, Role.ContactsAdministrator])
      .accessingReleasedPrisoner('KMI', oldReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.NOT_PERMITTED)
  )

export const grantedContactsReadScenarios: TestScenarios = new TestScenarios([])
  // In prison and in caseload
  .andScenarioWhere(
    userWithActiveCaseLoad('MDI')
      .withRoles([])
      .accessingPrisonerAt('MDI')
      .expectsStatus(PermissionCheckStatus.OK)
  )
  // Released within 3 years and Contacts Administrator Role
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.ReleasedPrisonerViewing, Role.ContactsAdministrator])
      .accessingReleasedPrisoner('KMI', recentReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.OK)
  )
  // Released within 3 years and Contacts Authoriser Role
  .andScenarioWhere(
    userWithActiveCaseLoad('KMI')
      .withRoles([Role.ReleasedPrisonerViewing, Role.ContactsAuthoriser])
      .accessingReleasedPrisoner('KMI', recentReleaseDate.toISOString())
      .expectsStatus(PermissionCheckStatus.OK)
  )

export const contactsReadCheckScenarios = grantedContactsReadScenarios.and(deniedContactsReadScenarios)
