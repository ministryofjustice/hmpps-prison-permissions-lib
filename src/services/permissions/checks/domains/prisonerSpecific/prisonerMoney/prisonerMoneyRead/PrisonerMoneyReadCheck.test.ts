import prisonerMoneyReadCheck from './PrisonerMoneyReadCheck'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'
import CaseLoad from '../../../../../../../types/user/CaseLoad'
import { PrisonerMoneyPermission } from '../../../../../../../types/permissions/domains/prisonerSpecific/PrisonerMoneyPermissions'

const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('PrisonerMoneyReadCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus        | caseLoads                                                             | loggedStatus                             | permitted
    ${baseCheckStatusFail} | ${[activeCaseLoad(prisonerMock.prisonId)]}                            | ${baseCheckStatusFail}                   | ${false}
    ${baseCheckStatusFail} | ${[]}                                                                 | ${baseCheckStatusFail}                   | ${false}
    ${baseCheckStatusPass} | ${[]}                                                                 | ${PermissionCheckStatus.NOT_IN_CASELOAD} | ${false}
    ${baseCheckStatusPass} | ${[activeCaseLoad('OTHER')]}                                          | ${PermissionCheckStatus.NOT_IN_CASELOAD} | ${false}
    ${baseCheckStatusPass} | ${[activeCaseLoad(prisonerMock.prisonId)]}                            | ${undefined}                             | ${true}
    ${baseCheckStatusPass} | ${[activeCaseLoad('OTHER'), inactiveCaseLoad(prisonerMock.prisonId)]} | ${undefined}                             | ${true}
  `(
    'baseCheckStatus: $baseCheckStatus, caseLoads: $caseLoads; permitted: $permitted',
    async ({ baseCheckStatus, caseLoads, loggedStatus, permitted }) => {
      const user = {
        ...prisonUserMock,
        activeCaseLoadId: caseLoads.find((cl: CaseLoad) => cl.currentlyActive)?.activeCaseLoadId,
        caseLoads,
      }

      const result = prisonerMoneyReadCheck({
        user,
        prisoner: prisonerMock,
        baseCheckStatus,
        requestDependentOn: [PrisonerMoneyPermission.read],
        permissionsLogger,
      })

      expect(result).toBe(permitted)

      if (!permitted) {
        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          user,
          prisonerMock,
          PrisonerMoneyPermission.read,
          loggedStatus,
        )
      } else {
        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
      }
    },
  )

  it('does not log permission failure if request not dependent on permission', () => {
    const result = prisonerMoneyReadCheck({
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
