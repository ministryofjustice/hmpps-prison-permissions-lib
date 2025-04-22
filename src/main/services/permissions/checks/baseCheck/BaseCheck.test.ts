import { userLEI, userMDI } from '../../../../../test/userMocks'
import {
  prisonerMDI,
  prisonerOUT,
  prisonerTRN,
  restrictedPrisonerMDI,
  restrictedPrisonerWithPrisonIdMDI,
} from '../../../../../test/prisonerMocks'
import { PermissionCheckStatus } from '../../../../types/permissions/PermissionCheckStatus'
import { Role } from '../../../../types/user/Role'
import baseCheck from './BaseCheck'

describe('BaseCheck', () => {
  test.each`
    user       | prisoner                             | roles                                | expected
    ${userMDI} | ${restrictedPrisonerMDI}             | ${[]}                                | ${PermissionCheckStatus.RESTRICTED_PATIENT}
    ${userMDI} | ${restrictedPrisonerMDI}             | ${[Role.PomUser]}                    | ${PermissionCheckStatus.OK}
    ${userLEI} | ${restrictedPrisonerMDI}             | ${[Role.PomUser]}                    | ${PermissionCheckStatus.RESTRICTED_PATIENT}
    ${userMDI} | ${restrictedPrisonerWithPrisonIdMDI} | ${[Role.PomUser]}                    | ${PermissionCheckStatus.RESTRICTED_PATIENT}
    ${userLEI} | ${restrictedPrisonerWithPrisonIdMDI} | ${[Role.PomUser]}                    | ${PermissionCheckStatus.RESTRICTED_PATIENT}
    ${userMDI} | ${restrictedPrisonerMDI}             | ${[Role.InactiveBookings]}           | ${PermissionCheckStatus.OK}
    ${userLEI} | ${restrictedPrisonerMDI}             | ${[Role.InactiveBookings]}           | ${PermissionCheckStatus.OK}
    ${userMDI} | ${prisonerOUT}                       | ${[]}                                | ${PermissionCheckStatus.PRISONER_IS_RELEASED}
    ${userMDI} | ${prisonerOUT}                       | ${[Role.InactiveBookings]}           | ${PermissionCheckStatus.OK}
    ${userMDI} | ${prisonerTRN}                       | ${[]}                                | ${PermissionCheckStatus.PRISONER_IS_TRANSFERRING}
    ${userMDI} | ${prisonerTRN}                       | ${[Role.GlobalSearch]}               | ${PermissionCheckStatus.OK}
    ${userMDI} | ${prisonerTRN}                       | ${[Role.GlobalSearch]}               | ${PermissionCheckStatus.OK}
    ${userMDI} | ${prisonerTRN}                       | ${[Role.InactiveBookings]}           | ${PermissionCheckStatus.OK}
    ${userLEI} | ${prisonerMDI}                       | ${[]}                                | ${PermissionCheckStatus.NOT_IN_CASELOAD}
    ${userLEI} | ${prisonerMDI}                       | ${[Role.GlobalSearch]}               | ${PermissionCheckStatus.OK}
    ${userLEI} | ${prisonerMDI}                       | ${[Role.PomUser]}                    | ${PermissionCheckStatus.NOT_IN_CASELOAD}
    ${userLEI} | ${prisonerMDI}                       | ${[Role.GlobalSearch, Role.PomUser]} | ${PermissionCheckStatus.OK}
    ${userMDI} | ${prisonerMDI}                       | ${[]}                                | ${PermissionCheckStatus.OK}
  `(
    `User '$user.username' | Roles: $roles | Prisoner '$prisoner.prisonerNumber' | Status: '$expected'`,
    async ({ user, prisoner, roles, expected }) => {
      const permissionCheckStatus = baseCheck({ ...user, userRoles: [...roles, Role.PrisonUser] }, prisoner)

      expect(permissionCheckStatus).toEqual(expected)
    },
  )
})
