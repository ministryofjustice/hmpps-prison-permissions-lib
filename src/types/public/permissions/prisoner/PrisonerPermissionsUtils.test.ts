import { PrisonerPermission } from './PrisonerPermissions'
import { prisonerPermissionPaths } from './PrisonerPermissionPaths'
import { isGranted } from './PrisonerPermissionsUtils'
import { setPrisonerPermission } from '../../../../services/permissions/utils/PermissionUtils'
import { prisonerPermissionsMock } from '../../../../testUtils/PrisonerPermissionsMock'

describe('Prisoner Permissions Utils', () => {
  it.each(Object.keys(prisonerPermissionPaths) as PrisonerPermission[])(
    'Can check permission: %s',
    (permission: PrisonerPermission) => {
      expect(isGranted(permission, setPrisonerPermission(permission, true, prisonerPermissionsMock))).toBe(true)
      expect(isGranted(permission, setPrisonerPermission(permission, false, prisonerPermissionsMock))).toBe(false)
    },
  )
})
