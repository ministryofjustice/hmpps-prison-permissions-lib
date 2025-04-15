import { getIfReadPermitted } from './PermissionUtils'
import { CorePersonRecordPermission } from '../../../types/permissions/domains/person/CorePersonRecordPermissions'
import { PrisonerPermissions } from '../../../types/permissions/prisoner/PrisonerPermissions'

describe('PermissionUtils', () => {
  describe('getIfReadPermitted', () => {
    const permissions = (canReadHeight: boolean) =>
      ({
        domainGroups: {
          person: { corePersonRecord: { [CorePersonRecordPermission.height]: { read: canReadHeight } } },
        },
      }) as unknown as PrisonerPermissions

    it('Can run getter function if permitted', async () => {
      const result = await getIfReadPermitted(CorePersonRecordPermission.height, permissions(true), () => 1.23)

      expect(result).toEqual(1.23)
    })

    it('Can run async getter function if permitted', async () => {
      const result = await getIfReadPermitted(CorePersonRecordPermission.height, permissions(true), () =>
        Promise.resolve(1.23),
      )

      expect(result).toEqual(1.23)
    })

    it('Will return null if not permitted', async () => {
      const result = await getIfReadPermitted(CorePersonRecordPermission.height, permissions(false), () =>
        Promise.resolve(1.23),
      )

      expect(result).toBeNull()
    })
  })
})
