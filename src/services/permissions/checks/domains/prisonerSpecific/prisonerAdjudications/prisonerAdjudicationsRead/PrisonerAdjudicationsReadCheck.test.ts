import prisonerAdjudicationsReadCheck from './PrisonerAdjudicationsReadCheck'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import CaseLoad from '../../../../../../../types/user/CaseLoad'
import { PrisonerAdjudicationsPermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/prisonerAdjudications/PrisonerAdjudicationsPermissions'
import { Role } from '../../../../../../../types/user/Role'

const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('PrisonerAdjudicationsReadCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus        | activeCaseLoadId         | otherCaseLoadId          | roles                   | loggedStatus                             | permitted
    ${baseCheckStatusFail} | ${prisonerMock.prisonId} | ${undefined}             | ${[]}                   | ${baseCheckStatusFail}                   | ${false}
    ${baseCheckStatusFail} | ${undefined}             | ${undefined}             | ${[]}                   | ${baseCheckStatusFail}                   | ${false}
    ${baseCheckStatusPass} | ${undefined}             | ${undefined}             | ${[]}                   | ${PermissionCheckStatus.NOT_IN_CASELOAD} | ${false}
    ${baseCheckStatusPass} | ${'OTHER'}               | ${undefined}             | ${[]}                   | ${PermissionCheckStatus.NOT_IN_CASELOAD} | ${false}
    ${baseCheckStatusPass} | ${undefined}             | ${undefined}             | ${[Role.PomUser]}       | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${'OTHER'}               | ${undefined}             | ${[Role.PomUser]}       | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${undefined}             | ${undefined}             | ${[Role.ReceptionUser]} | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${'OTHER'}               | ${undefined}             | ${[Role.ReceptionUser]} | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${prisonerMock.prisonId} | ${undefined}             | ${[]}                   | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${'OTHER'}               | ${prisonerMock.prisonId} | ${[]}                   | ${undefined}                             | ${true}
  `(
    'baseCheckStatus: $baseCheckStatus, activeCaseLoadId: $activeCaseLoadId, otherCaseLoadId: $otherCaseLoadId, roles: $roles, permitted: $permitted',
    async ({ baseCheckStatus, activeCaseLoadId, otherCaseLoadId, roles, loggedStatus, permitted }) => {
      const user = {
        ...prisonUserMock,
        activeCaseLoadId,
        caseLoads: [
          ...(activeCaseLoadId ? [activeCaseLoad(activeCaseLoadId)] : []),
          ...(otherCaseLoadId ? [inactiveCaseLoad(otherCaseLoadId)] : []),
        ],
        userRoles: roles,
      }

      const result = prisonerAdjudicationsReadCheck({
        user,
        prisoner: prisonerMock,
        baseCheckStatus,
        requestDependentOn: [PrisonerAdjudicationsPermission.read],
        permissionsLogger,
      })

      expect(result).toBe(permitted)

      if (!permitted) {
        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          user,
          prisonerMock,
          PrisonerAdjudicationsPermission.read,
          loggedStatus,
        )
      } else {
        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
      }
    },
  )

  it('does not log permission failure if request not dependent on permission', () => {
    const result = prisonerAdjudicationsReadCheck({
      user: prisonUserMock,
      prisoner: prisonerMock,
      baseCheckStatus: baseCheckStatusFail,
      requestDependentOn: [],
      permissionsLogger,
    })

    expect(result).toBeFalsy()
    expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
  })
})

function activeCaseLoad(id?: string): CaseLoad {
  return { caseLoadId: id, currentlyActive: true } as CaseLoad
}

function inactiveCaseLoad(id?: string): CaseLoad {
  return { caseLoadId: id, currentlyActive: false } as CaseLoad
}
