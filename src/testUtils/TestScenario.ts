// eslint-disable-next-line max-classes-per-file
import { HmppsUser, PrisonUser } from '../types/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { PermissionCheckStatus } from '../types/permissions/PermissionCheckStatus'
import { Role } from '../types/user/Role'
import CaseLoad from '../types/user/CaseLoad'
import { prisonUserMock } from './UserMocks'
import { prisonerMock } from './PrisonerMocks'
import { checkPrisonerAccess, PrisonerPermission } from '../types/permissions/prisoner/PrisonerPermissions'
import { PermissionsService } from '../index'
import PrisonApiClient from '../data/prisonApi/PrisonApiClient'
import PrisonerSearchClient from '../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from '../services/permissions/PermissionsLogger'

export function userWithActiveCaseLoad(caseLoad: string) {
  return new TestScenarioBuilder(caseLoad) as RolesOrCaseLoadBuilder
}

export class TestScenario {
  readonly user: HmppsUser

  readonly prisoner: Prisoner

  readonly expectedStatus: PermissionCheckStatus

  constructor({
    user,
    prisoner,
    expectedStatus,
  }: {
    user: HmppsUser
    prisoner: Prisoner
    expectedStatus: PermissionCheckStatus
  }) {
    this.user = user
    this.prisoner = prisoner
    this.expectedStatus = expectedStatus
  }

  public withUserRoles(roles: Role[]): TestScenario {
    return new TestScenario({
      user: { ...this.user, userRoles: [...this.user.userRoles, ...roles] },
      prisoner: { ...this.prisoner },
      expectedStatus: this.expectedStatus,
    })
  }

  public withoutUserRoles(roles: Role[]): TestScenario {
    return new TestScenario({
      user: { ...this.user, userRoles: [...this.user.userRoles.filter(role => !roles.includes(role))] },
      prisoner: { ...this.prisoner },
      expectedStatus: this.expectedStatus,
    })
  }

  public withExpectedStatus(expectedStatus: PermissionCheckStatus): TestScenario {
    return new TestScenario({
      user: { ...this.user },
      prisoner: { ...this.prisoner },
      expectedStatus,
    })
  }

  public toTestArray() {
    return [
      (this.user as PrisonUser).activeCaseLoadId,
      (this.user as PrisonUser).caseLoads
        .map(cl => cl.caseLoadId)
        .filter(cl => cl !== (this.user as PrisonUser).activeCaseLoadId),
      this.user.userRoles,
      this.prisoner.restrictedPatient
        ? `RESTRICTED_PATIENT_${this.prisoner.supportingPrisonId}`
        : this.prisoner.prisonId,
      this.expectedStatus,
      this,
    ]
  }
}

export class TestScenarios {
  scenarios: TestScenario[]

  constructor(scenarios: TestScenario[]) {
    this.scenarios = scenarios
  }

  public and(that: TestScenarios) {
    return new TestScenarios([...this.scenarios, ...that.scenarios])
  }

  public withUserRoles(roles: Role[]): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withUserRoles(roles)))
  }

  public withoutUserRoles(roles: Role[]): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withoutUserRoles(roles)))
  }

  public withExpectedStatus(expectedBaseCheckStatus: PermissionCheckStatus): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withExpectedStatus(expectedBaseCheckStatus)))
  }

  public toTestArray() {
    return this.scenarios.map(s => s.toTestArray())
  }
}

interface RolesOrCaseLoadBuilder {
  withAdditionalCaseLoads: (caseLoads: string[]) => RolesBuilder
  withRoles: (roles: Role[]) => PrisonerBuilder
}

interface RolesBuilder {
  withRoles: (roles: Role[]) => PrisonerBuilder
}

interface PrisonerBuilder {
  accessingTransferringPrisoner: () => ExpectedBaseStatusBuilder
  accessingReleasedPrisoner: () => ExpectedBaseStatusBuilder
  accessingPrisonerAt: (prisonId: string) => ExpectedBaseStatusBuilder
  accessingRestrictedPatientSupportedBy: (prisonId: string) => ExpectedBaseStatusBuilder
}

interface ExpectedBaseStatusBuilder {
  expectsStatus: (status: PermissionCheckStatus) => TestScenario
}

class TestScenarioBuilder implements RolesOrCaseLoadBuilder, RolesBuilder, PrisonerBuilder, ExpectedBaseStatusBuilder {
  private activeCaseLoad: string

  private additionalCaseLoads: string[] = []

  private roles: Role[] = []

  prisonId: string = 'OUT'

  restrictedPatient: boolean = false

  supportedByPrison?: string

  expectedStatus: PermissionCheckStatus = PermissionCheckStatus.NOT_PERMITTED

  public constructor(activeCaseLoad: string) {
    this.activeCaseLoad = activeCaseLoad
  }

  public withAdditionalCaseLoads(caseLoads: string[]) {
    this.additionalCaseLoads = caseLoads
    return this as RolesBuilder
  }

  public withRoles(roles: Role[]) {
    this.roles = roles
    return this as PrisonerBuilder
  }

  public accessingTransferringPrisoner() {
    this.prisonId = 'TRN'
    return this
  }

  public accessingReleasedPrisoner() {
    this.prisonId = 'OUT'
    return this
  }

  public accessingPrisonerAt(prisonId: string) {
    this.prisonId = prisonId
    return this
  }

  public accessingRestrictedPatientSupportedBy(prisonId: string) {
    this.restrictedPatient = true
    this.supportedByPrison = prisonId
    return this
  }

  public expectsStatus(status: PermissionCheckStatus): TestScenario {
    this.expectedStatus = status
    return this.createTestScenario()
  }

  private createTestScenario() {
    return new TestScenario({
      user: {
        ...prisonUserMock,
        activeCaseLoadId: this.activeCaseLoad,
        caseLoads: [
          { caseLoadId: this.activeCaseLoad, currentlyActive: true } as CaseLoad,
          ...this.additionalCaseLoads.map(id => ({ caseLoadId: id, currentlyActive: true }) as CaseLoad),
        ],
        userRoles: this.roles,
      },
      prisoner: {
        ...prisonerMock,
        prisonerNumber: this.restrictedPatient
          ? `PRISONER_RESTRICTED_PATIENT_${this.supportedByPrison}`
          : `PRISONER_${this.prisonId}`,
        prisonId: this.prisonId,
        restrictedPatient: this.restrictedPatient,
        supportingPrisonId: this.supportedByPrison,
      },
      expectedStatus: this.expectedStatus,
    })
  }
}

export function scenarioTest(scenarios: TestScenarios, permissionUnderTest: PrisonerPermission) {
  let prisonApiClient: PrisonApiClient
  let prisonerSearchClient: PrisonerSearchClient
  let permissionsLogger: PermissionsLogger

  let service: PermissionsService

  beforeEach(() => {
    prisonApiClient = { isUserAKeyWorker: jest.fn() } as unknown as PrisonApiClient
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonApiClient, prisonerSearchClient, permissionsLogger)
  })

  describe(`Permission: ${permissionUnderTest}`, () => {
    it.each(scenarios.toTestArray())(
      `Active caseload: %s | Other caseloads: %s | Roles: %s | Prisoner location: %s | Status: %s`,
      (_activeCaseLoad, _otherCaseLoads, _roles, _prisonerLocation, _status, testScenario) => {
        const { user, prisoner, expectedStatus } = testScenario as TestScenario

        const permissions = service.getPrisonerPermissions({
          user,
          prisoner,
          requestDependentOn: [permissionUnderTest],
        })

        expect(checkPrisonerAccess(permissionUnderTest, permissions)).toEqual(
          expectedStatus === PermissionCheckStatus.OK,
        )
      },
    )
  })
}
