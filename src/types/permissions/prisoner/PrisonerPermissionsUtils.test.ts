import { PrisonerPermission } from './PrisonerPermissions'
import checkPrisonerPermission from './PrisonerPermissionsUtils'
import { prisonerPermissionPaths } from './PrisonerPermissionPaths'
import { setPrisonerPermission } from '../../../testUtils/PrisonerPermissionsMock'

describe('Prisoner Permissions Utils', () => {
  it.each(Object.keys(prisonerPermissionPaths) as PrisonerPermission[])(
    'Can check permission: %s',
    (permission: PrisonerPermission) => {
      expect(checkPrisonerPermission(permission, setPrisonerPermission(permission, true))).toBe(true)
      expect(checkPrisonerPermission(permission, setPrisonerPermission(permission, false))).toBe(false)
    },
  )
})
