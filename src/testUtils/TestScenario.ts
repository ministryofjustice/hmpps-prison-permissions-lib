// eslint-disable-next-line max-classes-per-file
import { HmppsUser, PrisonUser } from '../types/internal/user/HmppsUser'
import Prisoner from '../data/hmppsPrisonerSearch/interfaces/Prisoner'
import { Role } from '../types/internal/user/Role'
import CaseLoad from '../types/internal/user/CaseLoad'
import { prisonUserMock } from './UserMocks'
import { prisonerMock } from './PrisonerMocks'
import { PrisonerPermission } from '../types/public/permissions/prisoner/PrisonerPermissions'
import PrisonerSearchClient from '../data/hmppsPrisonerSearch/PrisonerSearchClient'
import PermissionsLogger from '../services/permissions/PermissionsLogger'
import PermissionsService from '../services/permissions/PermissionsService'
import { isGranted } from '../types/public/permissions/prisoner/PrisonerPermissionsUtils'
import { PermissionCheckStatus } from '../types/internal/permissions/PermissionCheckStatus'

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

  public withCaseLoads(caseLoads: CaseLoad[]): TestScenario {
    const user = this.user as PrisonUser
    return new TestScenario({
      user: {
        ...user,
        activeCaseLoadId: caseLoads.find(cl => cl.currentlyActive)?.caseLoadId,
        caseLoads,
      } as PrisonUser,
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
      this.prisoner.lastPrisonId,
      this.prisoner.dateOutOfLastPrison,
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

  public andScenarioWhere(that: TestScenario) {
    return new TestScenarios([...this.scenarios, that])
  }

  public withUserRoles(roles: Role[]): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withUserRoles(roles)))
  }

  public withUserRole(role: Role): TestScenarios {
    return this.withUserRoles([role])
  }

  public withoutUserRoles(roles: Role[]): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withoutUserRoles(roles)))
  }

  public withCaseLoads(caseLoads: CaseLoad[]): TestScenarios {
    return new TestScenarios(this.scenarios.map(s => s.withCaseLoads(caseLoads)))
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
  accessingPrisonerAtAfterTransferFrom: (
    currentPrisonId: string,
    lastPrisonId: string,
    dateOutOfLastPrison?: string,
  ) => ExpectedBaseStatusBuilder
}

interface ExpectedBaseStatusBuilder {
  expectsStatus: (status: PermissionCheckStatus) => TestScenario
}

class TestScenarioBuilder implements RolesOrCaseLoadBuilder, RolesBuilder, PrisonerBuilder, ExpectedBaseStatusBuilder {
  private activeCaseLoad: string

  private additionalCaseLoads: string[] = []

  private roles: Role[] = []

  private prisonId: string = 'OUT'

  private restrictedPatient: boolean = false

  private supportedByPrison?: string

  private expectedStatus: PermissionCheckStatus = PermissionCheckStatus.NOT_PERMITTED

  private lastPrisonId?: string

  private dateOutOfLastPrison?: string

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

  public accessingPrisonerAtAfterTransferFrom(
    currentPrisonId: string,
    lastPrisonId: string,
    dateOutOfLastPrison?: string,
  ) {
    this.prisonId = currentPrisonId
    this.lastPrisonId = lastPrisonId
    this.dateOutOfLastPrison = dateOutOfLastPrison
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
        lastPrisonId: this.lastPrisonId,
        dateOutOfLastPrison: this.dateOutOfLastPrison,
      },
      expectedStatus: this.expectedStatus,
    })
  }
}

export function scenarioTest(permissionUnderTest: PrisonerPermission, scenarios: TestScenarios) {
  let prisonerSearchClient: PrisonerSearchClient
  let permissionsLogger: PermissionsLogger

  let service: PermissionsService

  beforeEach(() => {
    prisonerSearchClient = { getPrisonerDetails: jest.fn() } as unknown as PrisonerSearchClient
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger

    // @ts-expect-error - We are using a private constructor here for testing
    service = new (PermissionsService as unknown)(prisonerSearchClient, permissionsLogger)
  })

  describe(`Permission: ${permissionUnderTest}`, () => {
    it.each(scenarios.toTestArray())(
      `Active caseload: %s | Other caseloads: %s | Roles: %s | Prisoner location: %s | Last Prison location: %s | Date out of last prison: %s | Status: %s`,
      (
        _activeCaseLoad,
        _otherCaseLoads,
        _roles,
        _prisonerLocation,
        _lastPrisonId,
        _dateOutOfLastPrison,
        _status,
        testScenario,
      ) => {
        const { user, prisoner, expectedStatus } = testScenario as TestScenario

        const permissions = service.getPrisonerPermissions({
          user,
          prisoner,
          requestDependentOn: [permissionUnderTest],
        })

        expect(isGranted(permissionUnderTest, permissions)).toEqual(expectedStatus === PermissionCheckStatus.OK)

        if (expectedStatus === PermissionCheckStatus.OK) {
          expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
        } else {
          expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
            user,
            prisoner,
            permissionUnderTest,
            expectedStatus,
          )
        }
      },
    )
  })
}

// This test function helps to ensure test coverage by using typing to check that permissions aren't missed
export function scenarioTests<T extends PrisonerPermission>(permissionScenarios: Record<T, TestScenarios>) {
  Object.keys(permissionScenarios).forEach(key => {
    const permissionUnderTest = key as PrisonerPermission
    const scenarios = permissionScenarios[key as T]

    scenarioTest(permissionUnderTest, scenarios)
  })
}
