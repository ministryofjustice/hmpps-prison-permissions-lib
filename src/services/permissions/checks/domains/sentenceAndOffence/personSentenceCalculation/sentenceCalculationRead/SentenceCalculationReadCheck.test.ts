import sentenceCalculationReadCheck from './SentenceCalculationReadCheck'
import PermissionsLogger from '../../../../../PermissionsLogger'
import { PermissionCheckStatus } from '../../../../../../../types/permissions/PermissionCheckStatus'
import { PersonSentenceCalculationPermission } from '../../../../../../../types/permissions/domains/sentenceAndOffence/personSentenceCalculation/PersonSentenceCalculationPermissions'
import { Role } from '../../../../../../../types/user/Role'
import { prisonUserMock } from '../../../../../../../testUtils/UserMocks'
import { prisonerMock } from '../../../../../../../testUtils/PrisonerMocks'

const baseCheckStatusPass = PermissionCheckStatus.OK
const baseCheckStatusFail = PermissionCheckStatus.NOT_PERMITTED

describe('SentenceCalculationReadCheck', () => {
  let permissionsLogger: PermissionsLogger

  beforeEach(() => {
    permissionsLogger = { logPermissionCheckStatus: jest.fn() } as unknown as PermissionsLogger
  })

  test.each`
    baseCheckStatus        | roles                            | loggedStatus                              | permitted
    ${baseCheckStatusFail} | ${[]}                            | ${baseCheckStatusFail}                    | ${false}
    ${baseCheckStatusFail} | ${[Role.ReleaseDatesCalculator]} | ${baseCheckStatusFail}                    | ${false}
    ${baseCheckStatusPass} | ${[]}                            | ${PermissionCheckStatus.ROLE_NOT_PRESENT} | ${false}
    ${baseCheckStatusPass} | ${[Role.ReleaseDatesCalculator]} | ${undefined}                              | ${true}
  `(
    'baseCheckStatus: $baseCheckStatus, roles: $roles; permitted: $permitted',
    async ({ baseCheckStatus, roles, loggedStatus, permitted }) => {
      const user = { ...prisonUserMock, userRoles: roles }
      const result = sentenceCalculationReadCheck({
        user,
        prisoner: prisonerMock,
        baseCheckStatus,
        requestDependentOn: [PersonSentenceCalculationPermission.read],
        permissionsLogger,
      })

      expect(result).toBe(permitted)

      if (!permitted) {
        expect(permissionsLogger.logPermissionCheckStatus).toHaveBeenCalledWith(
          user,
          prisonerMock,
          PersonSentenceCalculationPermission.read,
          loggedStatus,
        )
      } else {
        expect(permissionsLogger.logPermissionCheckStatus).not.toHaveBeenCalled()
      }
    },
  )

  it('does not log permission failure if request not dependent on permission', () => {
    const result = sentenceCalculationReadCheck({
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
